import * as d3 from 'd3';

const paddingArea = 15;

export const pieGenerator = props => {
  const {width, height, data, radius = Math.min(width, height) / 2} = props;

  const pie = d3
    .pie()
    .sort(null)
    .value(d => d.value);

  const arc = d3.arc().innerRadius(0).outerRadius(radius);

  const color = d3
    .scaleOrdinal()
    .domain(data.map(d => d.label))
    .range(
      d3
        .quantize(t => d3.interpolateSpectral(t * 0.8 + 0.1), data.length)
        .reverse(),
    );

  const arcLabel = d3
    .arc()
    .innerRadius(radius * 0.9)
    .outerRadius(radius * 0.9);

  const arcs = pie(data);
  return {arcs, arcLabel, color, arc, radius};
};

export const makeArea = ({data, width, height}) => {
  const xDomain = d3.extent(data, d => d.x);
  const yDomain = [0, d3.max(data, d => d.y)];

  const xRange = [paddingArea, width + paddingArea];
  const yRange = [height - paddingArea, paddingArea];

  const x = d3.scaleLinear().domain(xDomain).range(xRange);
  const y = d3.scaleLinear().domain(yDomain).range(yRange);

  const area = d3
    .area()
    .curve(d3.curveBasis)
    .x(d => x(d.x))
    .y1(d => y(d.y))
    .y0(y(0));

  const xAxis = d3.scaleLinear().domain(xDomain).range(xRange);
  const yAxis = d3.scaleLinear().domain(yDomain).range(yRange);

  return {area, yAxis, xAxis, xDomain, yDomain};
};