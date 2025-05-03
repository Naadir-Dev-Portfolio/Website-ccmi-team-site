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
