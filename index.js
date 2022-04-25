const dataSource = [
    { name: '+5 Dexterity Vest', SellIn: '10', Quality: '20', Date: '04/17/2022' },
    { name: 'Aged Bri', SellIn: '2', Quality: '0', Date: '04/17/2022' },
    { name: 'Elixir of the Mongoose', SellIn: '5', Quality: '7', Date: '04/17/2022' },
    { name: 'Sulfuras, Hand of Ragnaros', SellIn: '0', Quality: '80', Date: '04/17/2022' },
    { name: 'Backstage passes to a TAFKAL80ETC concert', SellIn: '15', Quality: '20', Date: '04/17/2022' },
    { name: 'Conjered Mana Cake', SellIn: '3', Quality: '6', Date: '04/17/2022' }
]

function addItem(event) {
    event.preventDefault()
    const data = new FormData(event.target)
    const value = Object.fromEntries(data.entries())
    const objectValue = ({ value })
    const trueObject = objectValue.value
    dataSource.push(trueObject)
    const dataTable = $('#dt').DataTable()
    dataTable.row.add(trueObject).draw()
}

const form = document.querySelector('.item-add');

form.addEventListener('submit', addItem);

function qualityCalculation(event) {
    event.preventDefault()
    const formData = new FormData(event.target)
    const date = formData.get('Current Date')
    console.log(date)
    console.log(dataSource)
    /*const objectValue = ({ value })
    const trueObject = objectValue.value
    const dataTable = $('#dt').DataTable()
    dataTable.column.add(trueObject).draw()*/
}

const submitDate = document.querySelector('.submit-date')

submitDate.addEventListener('submit', qualityCalculation);


$(document).ready(function () {
    createTable()
})
function createTable() {
    $('#dt').DataTable({
        dom: 'Bfrtip',
        data: dataSource,
        columns: [
            {
                render: function (data, type, row, meta) {
                    return meta.row + meta.settings._iDisplayStart + 1;
                }
            },
            { data: 'name' },
            { data: 'SellIn' },
            { data: 'Quality' },
            { data: 'Date' },
            { defaultContent: 'Awaiting Calculation'}
        ],

        "paging": true,
        "info": true,
        "language": {
            "emptyTable": "No data available"
        },
        "fnRowCallback": function (nRow, aData, iDisplayIndex) {
            $("td:first", nRow).html(iDisplayIndex + 1);
            return nRow;
        },
    })
} 