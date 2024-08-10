问题：墨卡托投影 南极洲反转

- 地图数据：https://www.naturalearthdata.com/downloads/10m-cultural-vectors/


1. 编程方式使用 topojson
	1. 命令行版本已有教程 https://medium.com/@mbostock/command-line-cartography-part-1-897aa8f8ca2c
2. 命令行 topojsonsimplify 的编程版本 （关键 quantize）
3. 网站 https://mapshaper.org/ 
	1. https://github.com/mbloch/mapshaper/issues/432 输出geojson 要加 -o gj2008
	2. https://d3js.org/d3-geo 文档中说明需要使用 https://github.com/d3/d3-geo-projection/blob/main/README.md#geostitch 消除 antimeridian cuts
