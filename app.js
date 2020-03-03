// const list = document.querySelector("#list");
// const btn = document.querySelector("button");
// const items = [
//     "Subaru",
//     "Kia",
//     "Volkswagen",
//     "Fiat",
//     "BMW",
//     "GAZ",
//     "Dodge",
//     "Citroen"
// ];

// btn.addEventListener("click", addNewListItem);

// function addNewListItem() {
//     items.map(createList);
// }

// function createList(item) {
//     const el = document.createElement("li");
//     el.innerText = item;
//     list.appendChild(el);
// }

// const list = document.querySelector("ul");
// console.log(list);

// let li = document.createElement("li");
// list.appendChild(li);
// console.log(list);
const app = document.querySelector("#app");
let info = null;
const url =
    "http://andmebaas.stat.ee/sdmx-json/data/IT32/Y16_24+Y25_34+Y35_44+Y45_54+Y55_64+Y65_74.INTERNET.PC_IND.A/all?startTime=2005&endTime=2019&dimensionAtObservation=allDimensions";
async function getStats(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data;
}
function setTitle(title) {
    const h1 = document.createElement("h1");
    h1.innerText = title;
    app.appendChild(h1);
}
getStats(url).then(data => {
    setTitle(data.structure.name);
    dataSets = data.structure.dimensions.observation[0].values.map(
        (item, first) => {
            return data.structure.dimensions.observation[4].values.map(
                (item, second) => {
                    return `${first}:0:0:0:${second}`;
                }
            );
        }
    );
    const ctx = document.getElementById("chart").getContext("2d");
    const myChart = new Chart(ctx, {
        type: "line",
        data: {
            labels: data.structure.dimensions.observation[4].values.map(
                item => item.name
            ),
            datasets: [
                {
                    label:
                        data.structure.dimensions.observation[0].values[0].name,
                    data: dataSets[0].map(
                        item => data.dataSets[0].observations[item][0]
                    ),
                    backgroundColor: "rgba(177, 192, 219, 0.1)",
                    borderColor: "rgb(177, 192, 219)",
                    borderWidth: 3
                },
                {
                    label:
                        data.structure.dimensions.observation[0].values[1].name,
                    data: dataSets[1].map(
                        item => data.dataSets[0].observations[item][0]
                    ),
                    backgroundColor: "rgba(197, 219, 177, 0.1)",
                    borderColor: "rgb(197, 219, 177)",
                    borderWidth: 3
                },
                {
                    label:
                        data.structure.dimensions.observation[0].values[2].name,
                    data: dataSets[2].map(
                        item => data.dataSets[0].observations[item][0]
                    ),
                    backgroundColor: "rgba(234, 239, 81, 0.1)",
                    borderColor: "rgb(234, 239, 81)",
                    borderWidth: 3
                },
                {
                    label:
                        data.structure.dimensions.observation[0].values[3].name,
                    data: dataSets[3].map(
                        item => data.dataSets[0].observations[item][0]
                    ),
                    backgroundColor: "rgba(201, 40, 40, 0.1)",
                    borderColor: "rgb(201, 40, 40)",
                    borderWidth: 3
                },
                {
                    label:
                        data.structure.dimensions.observation[0].values[4].name,
                    data: dataSets[4].map(
                        item => data.dataSets[0].observations[item][0]
                    ),
                    backgroundColor: "rgba(101, 140, 140, 0.1)",
                    borderColor: "rgb(101, 140, 140)",
                    borderWidth: 3
                },
                {
                    label:
                        data.structure.dimensions.observation[0].values[5].name,
                    data: dataSets[5].map(
                        item => data.dataSets[0].observations[item][0]
                    ),
                    backgroundColor: "rgba(0, 0, 0, 0.1)",
                    borderColor: "rgb(0, 0, 0)",
                    borderWidth: 3
                }
            ]
        },
        options: {
            scales: {
                yAxes: [
                    {
                        ticks: {
                            beginAtZero: true
                        }
                    }
                ]
            }
        }
    });
});
