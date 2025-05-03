const codeSnippets = {
    "Power Query M": [
        {
            name: "Merge Query",
            content: `let
    Source = Table.NestedJoin(Table1, {"ID"}, Table2, {"ID"}, "Table2", JoinKind.LeftOuter),
    ExpandedTable = Table.ExpandTableColumn(Source, "Table2", {"Name", "Value"})
in
    ExpandedTable`
        },
        {
            name: "Filter Rows",
            content: `let
    Source = Excel.CurrentWorkbook(){[Name="Table1"]}[Content],
    FilteredRows = Table.SelectRows(Source, each ([Age] > 30))
in
    FilteredRows`
        }
        // ----------------------------------------------------------------------
    
,
    // ----------------------------------------------------------------------
    {
        name: "Convert Columns to Text Before Promoting Headers",
        content: `Table.PromoteHeaders(Table.Skip(Table.TransformColumnTypes([Data], List.Transform(Table.ColumnNames([Data]), each {_, type text})),2)))

`
    }

,
    // ----------------------------------------------------------------------

   {
        name: "Rename Columns Before Promoting Headers",
        content: `Table.AddColumn(#"Sheet Name", "Promoted Headers2", each Table.RenameColumns(Table.PromoteHeaders([Data]),{{"Material description","Material Description"},{"Vendor","Supplier"}},MissingField.Ignore))

`
    }

,
    // ----------------------------------------------------------------------
    {
        name: "Source from Web Excel Workbook",
        content: `let
  Source = Excel.Workbook(Web.Contents(\  CCMIPBDS626_Dates Table.xlsx), null, true)
in
    Source`
    }

,
    // ----------------------------------------------------------------------
    {
        name: "Expand a List Table",
        content: `Text.Combine(List.Transform(Table.ToList([x]), Text.From), \",\")`
    }

,
    // ----------------------------------------------------------------------
    {
        name: "Source from Folder",
        content: `let
  Source = Folder.Files(\"C:\\Dev\\PowerBI PostCodes\\PowerBI\\02 - SAP Work Centre Project Changes\"),
    #\"Filtered Rows\" = Table.SelectRows(Source, each ([Name] = \"COAM Post Code Maker - EE.xlsm\" or [Name] = \"COAM Post Code Maker - NL.xlsm\" or [Name] = \"COAM Post Code Maker - NW.xlsm\" or [Name] = \"COAM Post Code Maker - WM.xlsm\") and ([Folder Path] = \"C:\\Dev\\PowerBI PostCodes\\PowerBI\\02 - SAP Work Centre Project Changes\\\")),
  #\"Removed Other Columns\" = Table.SelectColumns(#\"Filtered Rows\", {\"Content\", \"Name\"}),
  #\"Added Custom\" = Table.AddColumn(#\"Removed Other Columns\", \"Custom\", each Table.SelectRows(
    Excel.Workbook([Content]),
    each [Kind] = \"Sheet\" and not Text.Contains([Item],\"Sheet\",Comparer.OrdinalIgnoreCase)
)),
  #\"Expanded Custom\" = Table.ExpandTableColumn(#\"Added Custom\", \"Custom\", {\"Name\", \"Data\"}, {\"SheetName\", \"Data\"}),
    #\"Filtered Rows1\" = Table.SelectRows(#\"Expanded Custom\", each ([SheetName] = \"Data\")),
  #\"Sheet Name\" = Table.SelectRows(#\"Filtered Rows1\", each [SheetName] = \"Data\"),
  #\"Added custom 1\" = Table.AddColumn(#\"Sheet Name\", \"Promoted Headers\", each Table.PromoteHeaders([Data])),
    #\"Expanded Promoted Headers\" = Table.ExpandTableColumn(#\"Added custom 1\", \"Promoted Headers\", {\"Post Code\", \"Post Code 0 Digit\", \"Post Code 1 Digit\", \"Post Code 2 Digit\", \"Town\", \"Patch\", \"Network\", \"Area\", \"Work Centre\", \"COAM\", \"Comments\"}, {\"Post Code\", \"Post Code 0 Digit\", \"Post Code 1 Digit\", \"Post Code 2 Digit\", \"Town\", \"Patch\", \"Network\", \"Area\", \"Work Centre\", \"COAM\", \"Comments\"}),
    #\"Removed Other Columns1\" = Table.SelectColumns(#\"Expanded Promoted Headers\",{\"Post Code\", \"Post Code 0 Digit\", \"Post Code 1 Digit\", \"Post Code 2 Digit\", \"Town\", \"Patch\", \"Network\", \"Area\", \"Work Centre\", \"COAM\", \"Comments\"})
in
  #\"Removed Other Columns1\"`
    }

,
    // ----------------------------------------------------------------------
    {
        name: "Get First Day of Previous Month",
        content: `Date.StartOfMonth(Date.From(Date.AddMonths(DateTime.LocalNow(),-1)))`
    }

,
    // ----------------------------------------------------------------------
    {
        name: "Get Members from SP Group",
        content: `= OData.Feed(\"your url website/_api/Web/SiteGroups/getbyname('your SharePoint group name')/Users\", null, [Implementation=\"2.0\"])`
    }

,
    // ----------------------------------------------------------------------
    {
        name: "Get Row & Column Counts",
        content: `let
    Source = PowerPlatform.Dataflows(null),
    Workspaces = Source{[Id=\"Workspaces\"]}[Data],
    #\"eae3ff49-45b4-414b-888c-5238c738d787\" = Workspaces{[workspaceId=\"eae3ff49-45b4-414b-888c-5238c738d787\"]}[Data],
    #\"37bccfa5-315c-46c1-a40f-32b3a7713c11\" = #\"eae3ff49-45b4-414b-888c-5238c738d787\"{[dataflowId=\"37bccfa5-315c-46c1-a40f-32b3a7713c11\"]}[Data],
    #\"Entity\" = #\"37bccfa5-315c-46c1-a40f-32b3a7713c11\"{[entity=\"Confirmation Times\",version=\"\"]}[Data],
    _Info = 
        Record.FromList(
            {
                \"CCMIPBDS665_Emergency Work Order Confirmation Times_Gateway\",
                Table.RowCount(#\"Entity\"),
                Table.ColumnCount(#\"Entity\")
            },
            {\"DataflowID\",\"Rows\",\"Cols\"}
        ),
    #\"Converted to Table\" = Record.ToTable(_Info)
in
    #\"Converted to Table\"`
    }

,
    // ----------------------------------------------------------------------
    {
        name: "Promote Headers via Different Sheets",
        content: `= Table.AddColumn(#\"Sorted Rows !TEMP!\", \"Content_New\", each Table.SelectColumns(

if Table.Contains( Excel.Workbook([Content]), [Name = \"Report Result\"] ) then Table.SelectRows( Excel.Workbook([Content]), each [Name] = \"Report Result\" ) else Table.SelectRows( Excel.Workbook([Content]), each [Name] = \"Sheet1\" )

, \"Data\" ))`
    }

,
    // ----------------------------------------------------------------------
    {
        name: "Rename & Remove all Columns in SharePoint",
        content: `    #\"== Start Of Clean Up SharePoint Fields ==\" = #\"Expanded FieldValuesAsText\",
  #\"*Remove x_0020_ from Column Names\" = Table.TransformColumnNames (#\"== Start Of Clean Up SharePoint Fields ==\", each Replacer.ReplaceText(_, \"_x0020_\", \" \")),
        #\"*Remove _x00 from Column Names\" = Table.TransformColumnNames (#\"*Remove x_0020_ from Column Names\", each Replacer.ReplaceText(_, \"_x00\", \" \")),
  #\"*Remove OData Columns\" = Table.RemoveColumns(#\"*Remove _x00 from Column Names\",List.FindText(Table.ColumnNames(#\"*Remove _x00 from Column Names\"), \"OData__\")),
  #\"*Removed Addional SP Columns\" = Table.RemoveColumns(#\"*Remove OData Columns\", {\"ContentTypeId\", \"owshiddenversion\", \"WorkflowVersion\", \"Attachments\", \"InstanceID\", \"Order\", \"GUID\", \"WorkflowInstanceID\", \"FileRef\", \"FileDirRef\", \"Last Modified\", \"Created Date\", \"FSObjType\", \"SortBehavior\", \"FileLeafRef\", \"UniqueId\", \"ParentUniqueId\", \"SyncClientId\", \"ProgId\", \"ScopeId\", \"File Type\", \"MetaInfo\", \"ItemChildCount\", \"FolderChildCount\", \"Restricted\", \"OriginatorId\", \"NoExecute\", \"ContentVersion\", \"AccessPolicy\", \"AppAuthor\", \"AppEditor\", \"SMTotalSize\", \"SMLastModifiedDate\", \"SMTotalFileStreamSize\", \"SMTotalFileCount\", \"ComplianceAssetId\"}),
  #\"== End Of Clean Up SharePoint Fields ==\" = #\"*Removed Addional SP Columns\"

in
  #\"== End Of Clean Up SharePoint Fields ==\"`
    }

,
    // ----------------------------------------------------------------------
    {
        name: "SharePoint Folder Files = CSV",
        content: `let
  Source = SharePoint.Files(\https://cadentgasltd.sharepoint.com/sites/BusSvc/CustCent/CCMITeam/PowerBI/\, [ApiVersion = 15]),
  #\"Folder Name\" = Table.SelectRows(Source, each Text.EndsWith([Folder Path], \"CCMIPBDS728_eGain Calls Dialled/\")),
  #\"Removed Other Columns\" = Table.SelectColumns(#\"Folder Name\", {\"Content\", \"Name\"}),
  #\"Added Custom\" = Table.AddColumn(#\"Removed Other Columns\", \"Custom\", each Table.PromoteHeaders(Csv.Document([Content]), [PromoteAllScalars = true]))
in
    #\"Added Custom\"`
    }

,
    // ----------------------------------------------------------------------
    {
        name: "SharePoint Folder Files = XLSX",
        content: `let
  Source = SharePoint.Files(\https://cadentgasltd.sharepoint.com/sites/BusSvc/CustCent/CCMITeam/PowerBI/\, [ApiVersion = 15]),
  #\"Folder Name\" = Table.SelectRows(Source, each Text.EndsWith([Folder Path], \"CCMIPBDS864_Repair Team Requests/\")),
  #\"Removed Other Columns\" = Table.SelectColumns(#\"Folder Name\", {\"Content\", \"Name\"}),
  #\"Added Custom\" = Table.AddColumn(#\"Removed Other Columns\", \"Custom\", each Table.SelectRows(
    Excel.Workbook([Content]),
    each [Kind] = \"Sheet\")),
  #\"Expanded Custom\" = Table.ExpandTableColumn(#\"Added Custom\", \"Custom\", {\"Name\", \"Data\"}, {\"SheetName\", \"Data\"}),
  #\"Added custom 1\" = Table.AddColumn(#\"Expanded Custom\", \"Promoted Headers\", each Table.PromoteHeaders([Data]))
in
  #\"Added custom 1\"`
    }

,
    // ----------------------------------------------------------------------
    {
        name: "Source from SharePoint List",
        content: `let
    Source = SharePoint.Tables(\https://cadentgasltd.sharepoint.com/sites/BusSvc/CustCent/forms/\, [Implementation=\"2.0\", ViewMode=\"All\"]),
  #\"Removed other columns\" = Table.SelectColumns(Source, {\"Id\", \"Title\", \"Items\"})
in
    #\"Removed other columns\"`
    }

,
    // ----------------------------------------------------------------------
    {
        name: "SharePoint User List",
        content: `Get data with OData type: https://sharepointsitename.sharepoint.com/_vti_bin/listdata.svc (change sharepointsitename to your site name)

2.2). Select the list “UserInformationList” and load the data


E.G. https://cadentgasltd.sharepoint.com/sites/BusSvc/CustCent/forms/_vti_bin/listdata.svc

`
    }

,
    // ----------------------------------------------------------------------
    {
        name: "Skip Rows When Importing Folder",
        content: `Table.AddColumn(#\"Sheet Name\", \"Promoted Headers\", each Table.PromoteHeaders(Table.Skip([Data],1)))`
    }

,
    // ----------------------------------------------------------------------
    {
        name: "Today's Date",
        content: `Date.From(DateTime.LocalNow())

Date.ToText(Date.From(DateTime.LocalNow())) <turns date into text value`
    }

,
    // ----------------------------------------------------------------------
    {
        name: "Week Commencing Date",
        content: `Date.StartOfWeek(Date.AddDays(Date.From(DateTime.LocalNow()),-1),Day.Monday)`
    }

,
    // ----------------------------------------------------------------------
    {
        name: "First Day Of Month",
        content: `Date.StartOfMonth(DateTime.LocalNow())`
    }

,
    // ----------------------------------------------------------------------
    {
        name: "Use Value in Another Query",
        content: `#\"latestCompletedMonth\"[Value]{0}

let
  Source = Table.FromRows(Json.Document(Binary.Decompress(Binary.FromText(\"i45WMjDUN7DUNzIwMlKKjQUA\", BinaryEncoding.Base64), Compression.Deflate)), let _t = ((type nullable text) meta [Serialized.Text = true]) in type table [Column1 = _t]),
  #\"Changed column type\" = Table.TransformColumnTypes(Source, {{\"Column1\", type date}}),
  Navigation = #\"Changed column type\"{0}[Column1],
  #\"Convert to table\" = Table.FromValue(Navigation)
in
  #\"Convert to table\"`
    }
],
    "VBA": [
        {
            name: "Export Function",
            content: `Sub ExportToExcel()
    Dim ws As Worksheet
    Set ws = ThisWorkbook.Sheets("Sheet1")
    ws.ExportAsFixedFormat Type:=xlTypePDF, Filename:="C:\\ExportedFile.pdf"
End Sub`
        },
        {
            name: "Add Numbers Function",
            content: `Function AddNumbers(a As Integer, b As Integer) As Integer
    AddNumbers = a + b
End Function`
        }
        // ----------------------------------------------------------------------
    
,
    // ----------------------------------------------------------------------
    {
        name: "Disable Background Refresh on All Power Query Connections",
        content: `Sub Change_Background_Refresh()
'Description: Enable or disable background refresh on all Power Query connections
'Author: Jon Acampora, Excel Campus
'Source:  https://www.excelcampus.com/vba/enable-background-refresh-on-all-power-query-connections/
   
Dim lCnt As Long

    'The following code loops through all connections
    'in the active workbook.  Change the property to
    'True to Enable, False to Disable background refresh.
    
    With ActiveWorkbook
        For lCnt = 1 To .Connections.Count
          'Excludes PowerPivot and other connections
          If .Connections(lCnt).Type = xlConnectionTypeOLEDB Then
            .Connections(lCnt).OLEDBConnection.BackgroundQuery = False
          End If
        Next lCnt
    End With
    
End Sub`
    }

,
    // ----------------------------------------------------------------------
    {
        name: "Standard SAP GUI Script",
        content: `Sub SapScript()

Application.DisplayAlerts = False

    ' Sap Variables
    Dim SapGui
    Dim Applic
    Dim connection
    Dim session
    Dim WSHShell
    Dim fso As Variant
    
    ' Sap Credentials
    Dim Sap_User, Sap_Pass As String
    
    ' Non Sap Variables
    Dim wb As Workbook
    Dim StartDate, EndDate As String

    Set wb = ThisWorkbook
        
    StartDate = Replace(wb.Sheets(\"Admin\").Range(\"StartDate\"), \"/\", \".\")
    EndDate = Replace(wb.Sheets(\"Admin\").Range(\"EndDate\"), \"/\", \".\")
    SD = wb.Sheets(\"Admin\").Range(\"StartDate\")
    ED = wb.Sheets(\"Admin\").Range(\"EndDate\")
    
    ' Assign Variables for input into SAP here
    Sap_User = wb.Sheets(\"Admin\").Range(\"SAP_User\").Value
    Sap_Pass = wb.Sheets(\"Admin\").Range(\"SAP_Cred\").Value
    
     Shell \"C:\\Program Files (x86)\\SAP\\FrontEnd\\SAPgui\\saplogon.exe\", vbNormalFocus
        Set WSHShell = CreateObject(\"WScript.Shell\")
            Do Until WSHShell.AppActivate(\"SAP Logon \")
                Application.Wait Now + TimeValue(\"0:00:01\")
            Loop
        Set WSHShell = Nothing

    Set SapGui = GetObject(\"SAPGUI\")
    Set Applic = SapGui.GetScriptingEngine
    Set connection = Applic.OpenConnection(\"PR0 ECC\", True) 'Change the text inbetween the quotes to look at your specific
    'connection name,
    Set session = connection.Children(0)
        'This will Log in to SAP
        session.findById(\"wnd[0]\").maximize
        
        session.findById(\"wnd[0]/usr/txtRSYST-BNAME\").Text = Sap_User 'Username_Var
        session.findById(\"wnd[0]/usr/pwdRSYST-BCODE\").Text = Sap_Pass 'Password_Var
        session.findById(\"wnd[0]\").sendVKey 0
        
        session.findById(\"wnd[0]/tbar[0]/okcd\").Text = \"IW37N\"
        session.findById(\"wnd[0]\").sendVKey 0
        

        session.findById(\"wnd[0]/usr/tabsTABSTRIP_TABBLOCK1/tabpS_TAB1/ssub%_SUBSCREEN_TABBLOCK1:RI_ORDER_OPERATION_LIST:1100/ctxtS_GEWRK-LOW\").Text = \"EM*\"
        session.findById(\"wnd[0]/usr/tabsTABSTRIP_TABBLOCK1/tabpS_TAB1/ssub%_SUBSCREEN_TABBLOCK1:RI_ORDER_OPERATION_LIST:1100/ctxtS_DATUM-LOW\").Text = \"\"
        session.findById(\"wnd[0]/usr/chkSP_OFN\").SetFocus
        session.findById(\"wnd[0]\").sendVKey 2
        
        ' Order Status
        session.findById(\"wnd[0]/usr/chkSP_OFN\").Selected = True
        session.findById(\"wnd[0]/usr/chkSP_IAR\").Selected = True
        session.findById(\"wnd[0]/usr/chkSP_MAB\").Selected = True
        session.findById(\"wnd[0]/usr/chkSP_HIS\").Selected = True

        ' Select General/Adminstration Tab
        session.findById(\"wnd[0]/usr/tabsTABSTRIP_TABBLOCK1/tabpS_TAB2\").Select
        session.findById(\"wnd[0]/usr/tabsTABSTRIP_TABBLOCK1/tabpS_TAB2/ssub%_SUBSCREEN_TABBLOCK1:RI_ORDER_OPERATION_LIST:1200/ctxtS_PLNNR-LOW\").Text = \"SAFBOSX\"
        
      ' Operation Tab
        session.findById(\"wnd[0]/usr/tabsTABSTRIP_TABBLOCK1/tabpS_TAB4\").Select
        session.findById(\"wnd[0]/usr/tabsTABSTRIP_TABBLOCK1/tabpS_TAB4/ssub%_SUBSCREEN_TABBLOCK1:RI_ORDER_OPERATION_LIST:1400/txtS_VORNR-LOW\").Text = \"010\"
        
        ' Date Tab
        session.findById(\"wnd[0]/usr/tabsTABSTRIP_TABBLOCK1/tabpS_TAB5\").Select
        session.findById(\"wnd[0]/usr/tabsTABSTRIP_TABBLOCK1/tabpS_TAB5/ssub%_SUBSCREEN_TABBLOCK1:RI_ORDER_OPERATION_LIST:1500/ctxtS_ISDD-LOW\").Text = StartDate
        session.findById(\"wnd[0]/usr/tabsTABSTRIP_TABBLOCK1/tabpS_TAB5/ssub%_SUBSCREEN_TABBLOCK1:RI_ORDER_OPERATION_LIST:1500/ctxtS_ISDD-HIGH\").Text = EndDate

        ' Misc Tab
        session.findById(\"wnd[0]/usr/tabsTABSTRIP_TABBLOCK1/tabpS_TAB9\").Select
        session.findById(\"wnd[0]/usr/tabsTABSTRIP_TABBLOCK1/tabpS_TAB9/ssub%_SUBSCREEN_TABBLOCK1:RI_ORDER_OPERATION_LIST:1900/ctxtSP_VARI\").Text = \"/NW_GSR_SUR\"

        ' Execute Report
        session.findById(\"wnd[0]/tbar[1]/btn[8]\").press
        
        'Export Data
        session.findById(\"wnd[0]/mbar/menu[0]/menu[6]\").Select
        session.findById(\"wnd[1]/tbar[0]/btn[0]\").press
        session.findById(\"wnd[1]/usr/subSUBSCREEN_STEPLOOP:SAPLSPO5:0150/sub:SAPLSPO5:0150/radSPOPLI-SELFLAG[0,0]\").Select
        session.findById(\"wnd[1]/usr/subSUBSCREEN_STEPLOOP:SAPLSPO5:0150/sub:SAPLSPO5:0150/radSPOPLI-SELFLAG[0,0]\").SetFocus
        session.findById(\"wnd[1]/tbar[0]/btn[0]\").press
        session.findById(\"wnd[1]/tbar[0]/btn[0]\").press
        
        ' Find Exported Data
        For Each w In Workbooks
            If w.Name Like \"Worksheet in Basis (1)*\" Then w.Activate
        Next w
        
        Dim targetWorkbook As Workbook
        Set targetWorkbook = ActiveWorkbook
            
        ' Process the found workbook
        Dim exportPath As String
        exportPath = ThisWorkbook.Path & \\\Export\\\
        exportName = \"Work Order Data \" & StartDate & \".xlsx\"
    
        ' Save the workbook
        targetWorkbook.SaveAs Filename:=exportPath & exportName
    
        targetWorkbook.Close SaveChanges:=False
        Set targetWorkbook = Application.Workbooks.Open(exportPath & exportName)
    
        ' Copy column C excluding headers
        With targetWorkbook.Sheets(1)
            Dim lastRow As Long
            lastRow = .Cells(.Rows.Count, \"C\").End(xlUp).Row
            .Range(\"C2:C\" & lastRow).Copy
        End With
        
        ' Return to SAP:
        session.findById(\"wnd[0]/tbar[0]/btn[15]\").press
        session.findById(\"wnd[0]/tbar[0]/btn[15]\").press
        
        ' Enter T-Code
        session.findById(\"wnd[0]/tbar[0]/okcd\").Text = \"ZIW47\"
        session.findById(\"wnd[0]\").sendVKey 0
        
        ' Enter SO numbers using Paste Function:
        session.findById(\"wnd[0]/usr/btn%_AUFNR_O_%_APP_%-VALU_PUSH\").press
        session.findById(\"wnd[1]/tbar[0]/btn[24]\").press
        session.findById(\"wnd[1]/tbar[0]/btn[8]\").press
        
        ' Enter Dates:
        session.findById(\"wnd[0]/usr/ctxtERSDA_C-LOW\").Text = StartDate
        session.findById(\"wnd[0]/usr/ctxtERSDA_C-HIGH\").Text = EndDate
        
        ' Reason for Variance:
        session.findById(\"wnd[0]/usr/ctxtGRUND_C-LOW\").Text = \"CO*\"
        ' Layout
        session.findById(\"wnd[0]/usr/ctxtVARIANT\").Text = \"/NL VAC\"
        
        ' Execute
        session.findById(\"wnd[0]/tbar[1]/btn[8]\").press
        
        'Export Data
            
        session.findById(\"wnd[0]/mbar/menu[0]/menu[6]\").Select
        session.findById(\"wnd[1]/tbar[0]/btn[0]\").press
        session.findById(\"wnd[1]/usr/subSUBSCREEN_STEPLOOP:SAPLSPO5:0150/sub:SAPLSPO5:0150/radSPOPLI-SELFLAG[0,0]\").Select
        session.findById(\"wnd[1]/usr/subSUBSCREEN_STEPLOOP:SAPLSPO5:0150/sub:SAPLSPO5:0150/radSPOPLI-SELFLAG[0,0]\").SetFocus
        session.findById(\"wnd[1]/tbar[0]/btn[0]\").press
        session.findById(\"wnd[1]/tbar[0]/btn[0]\").press
        
        targetWorkbook.Close False 'Get rid of Previous SAP Export
    
        For Each w In Workbooks
            If w.Name Like \"Worksheet in Basis (1)*\" Then w.Activate
        Next w
        
        Set targetWorkbook = ActiveWorkbook
        
           ' Process the found workbook
        outputName = Format(SD, \"yyyy.mm.dd\") & \" - \" & Format(ED, \"yyyy.mm.dd\") & \".xlsx\"
        Debug.Print (outputName)
        ' Save the workbook
        'targetWorkbook.SaveAs Filename:=\https://cadentgasltd.sharepoint.com/sites/BusSvc/CustCent/CCMITeam/PowerBI/Datasets/CCMI/CCMIPBDS942_BOA%20SAP%20Jobs/\ & outputName, FileFormat:=51
        
        'targetWorkbook.Close False
        
End Sub`
    }

,
    // ----------------------------------------------------------------------
    {
        name: "SAP Script - Logging Out",
        content: `'Log out of SAP
session.findById(\"wnd[0]/tbar[0]/btn[15]\").press
session.findById(\"wnd[0]/tbar[0]/btn[15]\").press
session.findById(\"wnd[0]/tbar[0]/btn[15]\").press
session.findById(\"wnd[0]/tbar[0]/btn[15]\").press
session.findById(\"wnd[1]/usr/btnSPOP-OPTION1\").press`
    }

,
    // ----------------------------------------------------------------------
    {
        name: "Refresh Power Query",
        content: `Sheets(\"SHEET_NAME\").ListObjects(\"TABLE_NAME\").QueryTable.Refresh BackgroundQuery:=False`
    }

,
    // ----------------------------------------------------------------------
    {
        name: "SAP Script - Check Sales Order Status History",
        content: `' SAP Scripting step
' Requires logging in to VA03
session.findById(\"wnd[0]/usr/ctxtVBAK-VBELN\").text = \"33009133\"
session.findById(\"wnd[0]/usr/ctxtVBAK-VBELN\").caretPosition = 8
session.findById(\"wnd[0]\").sendVKey 0
session.findById(\"wnd[0]/usr/subSUBSCREEN_HEADER:SAPMV45A:4021/btnBT_HEAD\").press
session.findById(\"wnd[0]/usr/tabsTAXI_TABSTRIP_HEAD/tabpT\\10\").select
session.findById(\"wnd[0]/usr/tabsTAXI_TABSTRIP_HEAD/tabpT\\10/ssubSUBSCREEN_BODY:SAPMV45A:4305/btnBT_KSTC\").press
session.findById(\"wnd[0]/mbar/menu[0]/menu[1]/menu[1]\").select
session.findById(\"wnd[0]/tbar[1]/btn[6]\").press
`
    }
],
    "Excel Formulas": [
        {
            name: "VLOOKUP Example",
            content: `=VLOOKUP(A2, Sheet2!A:B, 2, FALSE)`
        },
        {
            name: "SUMIF Example",
            content: `=SUMIF(A:A, ">=100", B:B)`
        }
        // ----------------------------------------------------------------------
    
,
    // ----------------------------------------------------------------------
    {
        name: "Week Commencing Date",
        content: `=TODAY()-WEEKDAY(TODAY(),2)+1`
    }

,
    // ----------------------------------------------------------------------
    {
        name: "Last Week Commencing Date",
        content: `=TODAY()-5-WEEKDAY(TODAY()-5,2)+1`
    }

,
    // ----------------------------------------------------------------------
    {
        name: "Beginning of Month",
        content: `=EOMONTH(TODAY(),-1)+1`
    }

,
    // ----------------------------------------------------------------------
    {
        name: "End of Month",
        content: `=EOMONTH(TODAY(),-2)+1`
    }

,
    // ----------------------------------------------------------------------
    {
        name: "Start of Financial Year",
        content: `=(DATE(YEAR(EDATE(TODAY(),-3)),ROW(A4),1))`
    }

,
    // ----------------------------------------------------------------------
    {
        name: "Start of previous Financial Year",
        content: `=DATE(YEAR(EDATE(TODAY(),-3)),ROW(A4)-12,1)`
    }

,
    // ----------------------------------------------------------------------
    {
        name: "Financial Year Text",
        content: `=TEXT(EDATE(TODAY(),-3),\"y\")&\"-\"&TEXT(EDATE(TODAY(),9),\"y\")`
    }

,
    // ----------------------------------------------------------------------
    {
        name: "CCMI Dist List (Sent From)",
        content: `=VLOOKUP(LEFT(reportname,(FIND(\" \",reportname,1)-1)),tblDistributionList,2,FALSE)`
    }

,
    // ----------------------------------------------------------------------
    {
        name: "Remove 7 Chars From Left",
        content: `=LEFT(A1,LEN(A1)-7)`
    }

,
    // ----------------------------------------------------------------------
    {
        name: "Remove 7 Chars From Right",
        content: `=RIGHT(A1,LEN(A1)-7)`
    }

,
    // ----------------------------------------------------------------------
    {
        name: "Extract Clean Name from Work Email",
        content: `=IFERROR(IF(SEARCH(\" \", SUBSTITUTE(SUBSTITUTE(SUBSTITUTE(SUBSTITUTE(A1,\".\",\" \"),
\"@cadentgas com\",\"\"),\"1\",\"\"),\"2\",\"\"))>=1,
PROPER(TRIM(SUBSTITUTE(SUBSTITUTE(SUBSTITUTE(SUBSTITUTE(A1,\".\",\" \"),
\"@cadentgas com\",\"\"),\"1\",\"\"),\"2\",\"\"))),),A1)`
    }

,
    // ----------------------------------------------------------------------
    {
        name: "Capitalize first letters of text",
        content: `=PROPER(A1)`
    }

,
    // ----------------------------------------------------------------------
    {
        name: "Convert Text to Number",
        content: `=INT(TEXT(TODAY(),\"dd/mm/yy\"))`
    }

,
    // ----------------------------------------------------------------------
    {
        name: "Count Blank Cells",
        content: `=COUNTBLANK(A1:A100)`
    }

,
    // ----------------------------------------------------------------------
    {
        name: "Count Non Blank Cells",
        content: `=COUNTA(A1:A100)`
    }

,
    // ----------------------------------------------------------------------
    {
        name: "Convert 'Surname, Name' to 'Name Surname'",
        content: `=SUBSTITUTE(IFERROR(RIGHT(A1,LEN(A1)-SEARCH(\",\",A1)-1)&\" \"&LEFT(A1,SEARCH(\",\",A1)-1),A1),\" 2\",\"\")`
    }
],
    "DAX": [
        {
            name: "Calculate Total Sales",
            content: `Total Sales = SUM(Sales[Amount])`
        },
        {
            name: "Year-to-Date Sales",
            content: `YTD Sales = TOTALYTD(SUM(Sales[Amount]), 'Date'[Date])`
        }
        // ----------------------------------------------------------------------
    
,
    // ----------------------------------------------------------------------
    {
        name: "Previous Year Calculation",
        content: `Overall Satisfaction LY = CALCULATE([Question Score], ALL(data_Calendar[Finacial Month Name]),data_Calendar[_FY Compare]=\"Previous\")

Overall Satisfaction CY = CALCULATE([Question Score], ALL(data_Calendar[Finacial Month Name]),data_Calendar[_FY Compare]=\"Current\")

_FY Compare = 

var vMaxYear = VALUE( RIGHT( MAX( data_Calendar[FY] ), 2 ) )

var vPreviousYear = vMaxYear - 1

RETURN

IF( vMaxYear = VALUE( RIGHT( data_Calendar[FY], 2 ) ), \"Current\",

IF( vPreviousYear = VALUE( RIGHT( data_Calendar[FY], 2 ) ), \"Previous\",

\"Before\" ))`
    }
],
    "Power Fx": [
        {
            name: "Navigate to Screen",
            content: `Navigate(Screen2, ScreenTransition.Fade)`
        },
        {
            name: "Set Variable",
            content: `Set(varUserName, TextInput1.Text)`
        }
        // ----------------------------------------------------------------------
    ],
    "JavaScript": [
        {
            name: "Fetch API Request",
            content: `fetch('https://api.example.com/data')
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));`
        },
        {
            name: "Event Listener",
            content: `document.getElementById('myButton').addEventListener('click', function() {
    alert('Button clicked!');
});`
        }
        // ----------------------------------------------------------------------
    
,
    // ----------------------------------------------------------------------
    {
        name: "Async Fetch Function",
        content: `"async function getData() {
    try {
        const response = await fetch('https://api.example.com/data');
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error('Error:', error);
    }
}
"`
    }
]
};
