const items = [
    { name: '+5 Dexterity Vest', SellIn: '10', Quality: '20', Date: '04/20/2022' },
    { name: 'Aged Brie', SellIn: '2', Quality: '0', Date: '04/21/2022' },
    { name: 'Elixir of the Mongoose', SellIn: '5', Quality: '7', Date: '04/22/2022' },
    { name: 'Sulfuras, Hand of Ragnaros', SellIn: '0', Quality: '80', Date: '04/23/2022' },
    { name: 'Backstage passes to a TAFKAL80ETC concert', SellIn: '15', Quality: '20', Date: '04/19/2022' },
    { name: 'Conjured Mana Cake', SellIn: '3', Quality: '6', Date: '04/24/2022' }
]

function addItem(event) {
    event.preventDefault()
    const data = new FormData(event.target)
    const value = Object.fromEntries(data.entries())
    const objectValue = ({ value })
    const trueObject = objectValue.value
    items.push(trueObject)
}

const form = document.querySelector('.item-add')
form.addEventListener('submit', addItem)


const generate = document.querySelector('.generate')
const tbody = document.querySelector('tbody')

function addBasicTable (item) {
    const tr = document.createElement("tr")
    tr.innerHTML = `
    <td>${item.name}</td>
    <td>${item.SellIn}</td>
    <td>${item.Quality}</td>
    <td>${item.Date}</td>
    `
    tbody.append(tr)
}

function addTable (item) {
    const tr = document.createElement("tr")
    tr.innerHTML = `
    <td>${item.name}</td>
    <td>${item.SellIn}</td>
    <td>${item.Quality}</td>
    <td>${item.Date}</td>
    <td>${item.RemSellIn}</td>
    <td>${item.CurrQuality}</td>
    `
    tbody.append(tr)
}

const table = document.querySelector('.table')

generate.addEventListener('click', event => {
    tbody.innerHTML=``
    table.style.display = "block"
    items.forEach(item => {
        addBasicTable(item) 
    })
})

currentDate = document.querySelector('.current-date')

function qualityCalculation(event) {
    event.preventDefault()
    const formData = new FormData(event.target)
    const date = formData.get('Current Date')
    tbody.innerHTML=``
    items.forEach(item => {
        const date1 = new Date(date)
        const date2 = new Date(item.Date)
        const timeDifference = date1.getTime() -date2.getTime()
        const dayDifference = timeDifference / (1000*3600*24)
        item['RemSellIn'] = item.SellIn - dayDifference
        if (item.name.includes('Aged Brie')) {
            item['CurrQuality'] = Number(item.Quality) + dayDifference
        } else if (item.name.includes('Sulfuras')) {
            item['CurrQuality'] = item.Quality
            item['RemSellIn'] = item.SellIn
        }else if (item.name.includes('Backstage passes')) {
            if (Number(item.RemSellIn) > 10) {
                item['CurrQuality'] = Number(item.Quality) + dayDifference
            } else if (Number(item.RemSellIn) <= 10 && Number(item.RemSellIn) > 5) {
                item['CurrQuality'] = Number(item.Quality) + (Number(item.SellIn) - 10) + (2 * (10 - Number(item.RemSellIn)))
            } else if (Number(item.RemSellIn) <= 5) {
                item['CurrQuality'] = Number(item.Quality) + (Number(item.SellIn) - 10) + 10 + (3 * (5 - Number(item.RemSellIn)))
            }
            if (Number(item.RemSellIn) <= 0) {
                item['CurrQuality'] = 0
            }
        } else if (item.name.includes('Conjured')) {
            item['CurrQuality'] = item.Quality - (2 * Number(dayDifference))
        } else {
            item['CurrQuality'] = item.Quality - dayDifference
        }
        if (Number(item.CurrQuality) >= 50 && !item.name.includes('Sulfuras')) {
            item.CurrQuality = 50
        }
        if (Number(item.CurrQuality) <= 0) {
            item.CurrQuality = 0
        }
        addTable(item)
    })
}

const submitDate = document.querySelector('.submit-date')
submitDate.addEventListener('submit', qualityCalculation)