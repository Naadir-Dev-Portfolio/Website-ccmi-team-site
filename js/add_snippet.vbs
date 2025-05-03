' add_snippet.vbs
Option Explicit

' Constants for file operations
Const ForReading = 1
Const ForWriting = 2
Const ForAppending = 8

Dim fso, scriptFolder, inputFilePath
Dim languages, language, snippetName, snippetContent
Dim snippetsContent, newSnippet
Dim languageFound, insertPosition
Dim inputFile, outputFile
Dim tempSnippetPath, shell, userChoice

' Initialize FileSystemObject
Set fso = CreateObject("Scripting.FileSystemObject")

' Get the folder where the script is located
scriptFolder = fso.GetParentFolderName(WScript.ScriptFullName)

' Define the path to snippets.js (same folder as the script)
inputFilePath = fso.BuildPath(scriptFolder, "snippets.js")

' Check if the snippets.js file exists
If Not fso.FileExists(inputFilePath) Then
    WScript.Echo "Error: snippets.js file not found in " & scriptFolder
    WScript.Quit
End If

' Define the list of available programming languages (including JavaScript)
languages = Array("Power Query M", "VBA", "Excel Formulas", "DAX", "Power Fx", "JavaScript")

' Function to display the language selection and get user's choice
Function SelectLanguage(langs)
    Dim msg, i, choice, valid
    msg = "Select the programming language category:" & vbCrLf & vbCrLf
    For i = 0 To UBound(langs)
        msg = msg & (i + 1) & ". " & langs(i) & vbCrLf
    Next
    msg = msg & vbCrLf & "Enter the number corresponding to your choice:"

    Do
        choice = InputBox(msg, "Select Language")
        If choice = "" Then
            ' User clicked Cancel
            WScript.Echo "Operation canceled by the user. Exiting."
            WScript.Quit
        End If
        If IsNumeric(choice) Then
            If CInt(choice) >= 1 And CInt(choice) <= UBound(langs) + 1 Then
                SelectLanguage = langs(CInt(choice) - 1)
                Exit Function
            End If
        End If
        MsgBox "Invalid selection. Please enter a number between 1 and " & (UBound(langs) + 1) & ".", vbExclamation, "Invalid Input"
    Loop
End Function

' Function to create a backup of snippets.js
Sub CreateBackup(filePath, backupFolder)
    Dim backupFolderPath, timestamp, backupFileName, backupFilePath
    ' Define the backup folder path
    backupFolderPath = fso.BuildPath(scriptFolder, backupFolder)
    
    ' Check if backup folder exists; if not, create it
    If Not fso.FolderExists(backupFolderPath) Then
        On Error Resume Next
        fso.CreateFolder(backupFolderPath)
        If Err.Number <> 0 Then
            WScript.Echo "Error: Unable to create backup folder at " & backupFolderPath
            WScript.Quit
        End If
        On Error GoTo 0
    End If
    
    ' Get current date and time for the backup filename
    timestamp = GetCurrentTimestamp()
    
    ' Construct backup filename
    backupFileName = "snippets_" & timestamp & ".js"
    
    ' Define the full backup file path
    backupFilePath = fso.BuildPath(backupFolderPath, backupFileName)
    
    ' Copy the original snippets.js to the backup location
    On Error Resume Next
    fso.CopyFile filePath, backupFilePath, True
    If Err.Number <> 0 Then
        WScript.Echo "Error: Unable to create backup file at " & backupFilePath
        WScript.Quit
    End If
    On Error GoTo 0
    
End Sub

' Function to get current timestamp in ddmmyyyy-hhmm format
Function GetCurrentTimestamp()
    Dim currentDate, dayPart, monthPart, yearPart, hourPart, minutePart
    currentDate = Now
    
    dayPart = Right("0" & Day(currentDate), 2)
    monthPart = Right("0" & Month(currentDate), 2)
    yearPart = Year(currentDate)
    hourPart = Right("0" & Hour(currentDate), 2)
    minutePart = Right("0" & Minute(currentDate), 2)
    
    GetCurrentTimestamp = dayPart & monthPart & yearPart & "-" & hourPart & minutePart
End Function

' Function to add a separator line
Function AddSeparator()
    AddSeparator = "    // ----------------------------------------------------------------------" & vbCrLf
End Function

' Create a backup before making any changes
CreateBackup inputFilePath, "code_snippet_backup"

' Prompt user to select the language category
language = SelectLanguage(languages)

' Prompt user for the snippet name
snippetName = InputBox("Enter the name of the snippet:", "Snippet Name")
If snippetName = "" Then
    WScript.Echo "No snippet name entered. Exiting."
    WScript.Quit
End If

' Prompt user to input the snippet content via Notepad
tempSnippetPath = fso.BuildPath(scriptFolder, "temp_snippet.txt")

' Create or overwrite the temporary snippet file
Set inputFile = fso.OpenTextFile(tempSnippetPath, ForWriting, True)
inputFile.Write ""
inputFile.Close

' Open Notepad for user to enter the snippet
Set shell = CreateObject("WScript.Shell")
shell.Run "notepad.exe " & Chr(34) & tempSnippetPath & Chr(34), 1, True

' Read the content from the temporary snippet file
If Not fso.FileExists(tempSnippetPath) Then
    WScript.Echo "Error: Temporary snippet file was not created."
    WScript.Quit
End If

Set inputFile = fso.OpenTextFile(tempSnippetPath, ForReading)
snippetContent = inputFile.ReadAll
inputFile.Close

' Delete the temporary snippet file
On Error Resume Next
fso.DeleteFile(tempSnippetPath)
On Error GoTo 0

If Trim(snippetContent) = "" Then
    WScript.Echo "No snippet content entered. Exiting."
    WScript.Quit
End If

' Format the new snippet as JSON
' Escape backslashes, double quotes, and backticks in the snippet content
snippetContent = Replace(snippetContent, "\", "\\")
snippetContent = Replace(snippetContent, """", "\""")
snippetContent = Replace(snippetContent, "`", "\`")
' Replace carriage returns and line feeds with actual line breaks within the template literal
snippetContent = Replace(snippetContent, vbCrLf, vbLf)
snippetContent = Replace(snippetContent, vbCr, vbLf)

' Construct the new snippet with a separator
newSnippet = AddSeparator() & "    {" & vbCrLf & _
            "        name: """ & snippetName & """," & vbCrLf & _
            "        content: `" & snippetContent & "`" & vbCrLf & _
            "    }"

' Read the entire snippets.js content
Set inputFile = fso.OpenTextFile(inputFilePath, ForReading)
snippetsContent = inputFile.ReadAll
inputFile.Close

' Find the position of the specified language
Dim languageSectionStart, arrayStart, arrayEnd
languageSectionStart = InStr(1, snippetsContent, """" & language & """: [", vbTextCompare)
If languageSectionStart = 0 Then
    WScript.Echo "Language category """ & language & """ not found in snippets.js."
    WScript.Quit
End If

' Find the start of the array
arrayStart = InStr(languageSectionStart, snippetsContent, "[", vbTextCompare)
If arrayStart = 0 Then
    WScript.Echo "Malformed snippets.js: '[' not found after language category."
    WScript.Quit
End If

' Find the end of the array
arrayEnd = FindMatchingBracket(snippetsContent, arrayStart)
If arrayEnd = 0 Then
    WScript.Echo "Malformed snippets.js: Matching ']' not found."
    WScript.Quit
End If

' Extract the array content
Dim arrayContent
arrayContent = Mid(snippetsContent, arrayStart + 1, arrayEnd - arrayStart - 1)

' Check if the array is empty or not
Dim trimmedArrayContent
trimmedArrayContent = Trim(arrayContent)
If Len(trimmedArrayContent) > 0 Then
    ' Append a comma before the new snippet
    newSnippet = "," & vbCrLf & newSnippet
End If

' Insert the new snippet before the closing bracket
snippetsContent = Left(snippetsContent, arrayEnd - 1) & vbCrLf & newSnippet & vbCrLf & Mid(snippetsContent, arrayEnd)

' Write the updated content back to snippets.js
Set outputFile = fso.OpenTextFile(inputFilePath, ForWriting, False)
outputFile.Write snippetsContent
outputFile.Close

WScript.Echo "Snippet added successfully to the """ & language & """ section."

' Function to find the matching closing bracket for the array
Function FindMatchingBracket(text, startPos)
    Dim pos, depth, char
    pos = startPos
    depth = 1
    Do While pos < Len(text)
        pos = pos + 1
        char = Mid(text, pos, 1)
        If char = "[" Then
            depth = depth + 1
        ElseIf char = "]" Then
            depth = depth - 1
            If depth = 0 Then
                FindMatchingBracket = pos
                Exit Function
            End If
        End If
    Loop
    FindMatchingBracket = 0 ' No matching bracket found
End Function
