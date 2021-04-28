import * as d3 from 'd3';

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
