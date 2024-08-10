import { readFile, writeFile } from "fs/promises"
import { csvParse, csvFormat, groups, group, flatGroup } from "d3"

const TFR_File = await readFile("./IHME_GBD_2021_FERTILITY_1950_2100_TFR_Y2024M03D15.CSV", "utf-8")
const TFR_Data = csvParse(TFR_File)

await parseData(TFR_Data, "TFR")

const LB_File = await readFile("./IHME_GBD_2021_FERTILITY_1950_2100_LB_Y2024M03D15.CSV", "utf-8")
const LB_Data = csvParse(TFR_File)

await parseData(LB_Data, "LB")

async function parseData(_data, filePrefix) {
  const countryData = _data.filter((item) => ![
    "Global",
    "Southeast Asia, East Asia, and Oceania",
    "Southeast Asia",
    "East Asia",
    "Oceania",
    "Western Europe",
    "Central Europe, Eastern Europe, and Central Asia",
    "Central Europe",
    "Eastern Europe",
    "Central Asia",
    "High-income Asia Pacific",
    "High-income",
    "Southern Latin America",
    "High-income North America",
    "Latin America and Caribbean",
    "Caribbean",
    "Andean Latin America",
    "Central Latin America",
    "Tropical Latin America",
    "North Africa and Middle East",
    "South Asia",
    "Sub-Saharan Africa",
    "Central Sub-Saharan Africa",
    "Eastern Sub-Saharan Africa",
    "Southern Sub-Saharan Africa",
    "Western Sub-Saharan Africa",
    "United States Virgin Islands",
    "Australasia",
    "Taiwan (Province of China)",
  ].includes(item.location_name))

  const data = groups(
    countryData,
    (d) => d.location_name,
    (d) => d.year_id,
  )

  const dataPointRows = [];
  const metadataRows = [];
  const countryNameMap = {
    'Republic of Moldova': 'Moldova (the Republic of)',
    'United Republic of Tanzania': 'Tanzania, the United Republic of',
    'Niger': 'Niger (the)',
  }
  for (let i = 0; i < data.length; i++) {
    const [key, years] = data[i];

    const dataPointRow = { id: i };
    for (const [year, value] of years) {
      dataPointRow[year] = value[0].val;
    }
    dataPointRows.push(dataPointRow);

// | id        | name        | type    | displayName  | iconUrl        | backgroundUrl  | backgroundMusicUrl |
    metadataRows.push({
      id: i,
      name: countryNameMap[key] || key,
      type: "country",
    })
  }

  const dataPointCsvString = csvFormat(dataPointRows, ["id", ...Array.from(new Set(countryData.map((item) => item.year_id)))])
  await writeFile(`./${filePrefix}_data_point.csv`, dataPointCsvString, {
    encoding: "utf-8",
    flag: "w",
  })

  const metadataCsvString = csvFormat(metadataRows, ["id", "name", "type", "displayName", "iconUrl", "backgroundUrl", "backgroundMusicUrl"])
  await writeFile(`./${filePrefix}_metadata.csv`, metadataCsvString, {
    encoding: "utf-8",
    flag: "w",
  })
}
