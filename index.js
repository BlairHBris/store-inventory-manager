const items = [
    { name: '+5 Dexterity Vest', sellIn: '10', quality: '20', date: '04/20/2022' },
    { name: 'Aged Brie', sellIn: '2', quality: '0', date: '04/21/2022' },
    { name: 'Elixir of the Mongoose', sellIn: '5', quality: '7', date: '04/22/2022' },
    { name: 'Sulfuras, Hand of Ragnaros', sellIn: '0', quality: '80', date: '04/23/2022' },
    { name: 'Backstage passes to a TAFKAL80ETC concert', sellIn: '15', quality: '20', date: '04/19/2022' },
    { name: 'Conjured Mana Cake', sellIn: '3', quality: '6', date: '04/24/2022' }
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
    if (item.name.includes('Sulfuras')) {
        tr.innerHTML = `
    <td>${item.name}</td>
    <td>${item.sellIn}</td>
    <td>80</td>
    <td>${item.date}</td>
    `
    tbody.append(tr)
    } else {
        tr.innerHTML = `
        <td>${item.name}</td>
        <td>${item.sellIn}</td>
        <td>${item.quality}</td>
        <td>${item.date}</td>
        `
        tbody.append(tr)
    }

}

function addTable (item) {
    const tr = document.createElement("tr")
    tr.innerHTML = `
    <td>${item.name}</td>
    <td>${item.sellIn}</td>
    <td>${item.quality}</td>
    <td>${item.date}</td>
    <td>${item.remainingSellIn}</td>
    <td>${item.currentQuality}</td>
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
        const date2 = new Date(item.date)
        const timeDifference = date1.getTime() -date2.getTime()
        const dayDifference = timeDifference / (1000*3600*24)
        item.remainingSellIn = item.sellIn - dayDifference
        if (item.name.includes('Aged Brie')) {
            item.currentQuality = (+item.quality) + dayDifference
        } else if (item.name.includes('Sulfuras')) {
            item.currentQuality = item.quality
            item.remainingSellIn = item.sellIn
        }else if (item.name.includes('Backstage passes')) {
            if ((+item.remainingSellIn) > 10) {
                item.currentQuality = (+item.quality) + dayDifference
            } else if ((+item.remainingSellIn) <= 10 && (+item.remainingSellIn) > 5) {
                item.currentQuality = (+item.quality) + ((+item.sellIn) - 10) + (2 * (10 - (+item.remainingSellIn)))
            } else if ((+item.remainingSellIn) <= 5) {
                item.currentQuality = (+item.quality) + ((+item.sellIn) - 10) + 10 + (3 * (5 - (+item.remainingSellIn)))
            }
            if ((+item.remainingSellIn) <= 0) {
                item.currentQuality = 0
            }
        } else if (item.name.includes('Conjured')) {
            item.currentQuality = item.quality - (2 * (+dayDifference))
        } else {
            item.currentQuality = item.quality - dayDifference
        }
        if ((+item.currentQuality) >= 50 && !item.name.includes('Sulfuras')) {
            item.currentQuality = 50
        }
        if ((item.currentQuality) <= 0) {
            item.currentQuality = 0
        }
        addTable(item)
    })
}

const submitDate = document.querySelector('.submit-date')
submitDate.addEventListener('submit', qualityCalculation)