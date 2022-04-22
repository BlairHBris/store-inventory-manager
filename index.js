const dataSource = [
    { name: '+5 Dexterity Vest', SellIn: '10', Quality: '20', Date: '4/22/2022' },
    { name: 'Aged Bri', SellIn: '2', Quality: '0', Date: '4/22/2022' },
    { name: 'Elixir of the Mongoose', SellIn: '5', Quality: '7', Date: '4/22/2022' },
    { name: 'Sulfuras, Hand of Ragnaros', SellIn: '0', Quality: '80', Date: '4/22/2022' },
    { name: 'Backstage passes to a TAFKAL80ETC concert', SellIn: '15', Quality: '20', Date: '4/22/2022' },
    { name: 'Conjered Mana Cake', SellIn: '3', Quality: '6', Date: '4/22/2022' }
]

const input = document.querySelectorAll('input')

function addItem(event) {
    event.preventDefault()
    const data = new FormData(event.target)
    const value = Object.fromEntries(data.entries())
    const objectValue = ({ value })
    const trueObject = objectValue.value
    const dataTable = $('#dt').DataTable()
    dataTable.row.add(trueObject).draw()
}

const form = document.querySelector('.item-add');

form.addEventListener('submit', addItem);

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
            { data: 'Date' }
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