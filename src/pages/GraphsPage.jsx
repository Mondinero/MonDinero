import React, { useEffect } from 'react';
import * as d3 from 'd3';
import styles from './GraphPageStyles.module.scss';

export default function Graphs() {
  const data = {
    name: 'June Expenses',
    children: [
      {
        name: 'Entertainment',
        children: [
          { name: 'AMC Movies', value: 14.8 },
          { name: 'Steam', value: 59.99 },
        ],
      },
      {
        name: 'Food and Drink',
        children: [
          {
            name: 'Uber Eats',
            children: [
              { name: 'June 3', value: 18.92 },
              { name: 'June 6', value: 13.12 },
              { name: 'June 13', value: 11.72 },
              { name: 'June 21', value: 23.65 },
              { name: 'June 22', value: 17.42 },
            ],
          },

          { name: 'McDonalds', value: 89.92 },
        ],
      },
      {
        name: 'Merchandise',
        children: [
          { name: 'Apple', value: 2895.98 },
          { name: 'Amazon', value: 48.96 },
          { name: 'Costco', value: 213.87 },
        ],
      },
      {
        name: 'Transportation',
        children: [
          { name: 'Sunoco Gas', value: 45.94 },
          { name: 'Septa', value: 14 },
          { name: 'NYC Metro', value: 2.5 },
        ],
      },
      {
        name: 'Travel',
        children: [
          { name: 'Hilton', value: 295.95 },
          { name: 'American Airlines', value: 495.23 },
        ],
      },
      { name: 'Rent and Utilities', value: 1450 },
    ],
  };

  const format = d3.format(',d');
  const width = 500;
  const color = d3.scaleOrdinal(d3.quantize(d3.interpolateRainbow, data.children.length + 1));
  const radius = width / 6;
  const arc = d3
    .arc()
    .startAngle((d) => d.x0)
    .endAngle((d) => d.x1)
    .padAngle((d) => Math.min((d.x1 - d.x0) / 2, 0.005))
    .padRadius(radius * 1.5)
    .innerRadius((d) => d.y0 * radius)
    .outerRadius((d) => Math.max(d.y0 * radius, d.y1 * radius - 1));

  const partition = (data) => {
    const root = d3
      .hierarchy(data)
      .sum((d) => d.value)
      .sort((a, b) => b.value - a.value);
    return d3.partition().size([2 * Math.PI, root.height + 1])(root);
  };

  function drawChart() {
    const root = partition(data);

    root.each((d) => (d.current = d));

    const svg = d3.create('svg').attr('viewBox', [0, 0, width, width]).style('font', '10px sans-serif');

    const g = svg.append('g').attr('transform', `translate(${width / 2},${width / 2})`);

    const path = g
      .append('g')
      .selectAll('path')
      .data(root.descendants().slice(1))
      .join('path')
      .attr('fill', (d) => {
        while (d.depth > 1) d = d.parent;
        return color(d.data.name);
      })
      .attr('fill-opacity', (d) => (arcVisible(d.current) ? (d.children ? 0.6 : 0.4) : 0))
      .attr('pointer-events', (d) => (arcVisible(d.current) ? 'auto' : 'none'))

      .attr('d', (d) => arc(d.current));

    path
      .filter((d) => d.children)
      .style('cursor', 'pointer')
      .on('click', clicked);

    path.append('title').text(
      (d) =>
        `${d
          .ancestors()
          .map((d) => d.data.name)
          .reverse()
          .join('/')}\n${format(d.value)}`
    );

    const label = g
      .append('g')
      .attr('pointer-events', 'none')
      .attr('text-anchor', 'middle')
      .style('user-select', 'none')
      .selectAll('text')
      .data(root.descendants().slice(1))
      .join('text')
      .attr('dy', '0.35em')
      .attr('fill-opacity', (d) => +labelVisible(d.current))
      .attr('transform', (d) => labelTransform(d.current))
      .text((d) => d.data.name);

    const parent = g
      .append('circle')
      .datum(root)
      .attr('r', radius)
      .attr('fill', 'none')
      .attr('pointer-events', 'all')
      .on('click', clicked);

    function clicked(event, p) {
      parent.datum(p.parent || root);

      root.each(
        (d) =>
          (d.target = {
            x0: Math.max(0, Math.min(1, (d.x0 - p.x0) / (p.x1 - p.x0))) * 2 * Math.PI,
            x1: Math.max(0, Math.min(1, (d.x1 - p.x0) / (p.x1 - p.x0))) * 2 * Math.PI,
            y0: Math.max(0, d.y0 - p.depth),
            y1: Math.max(0, d.y1 - p.depth),
          })
      );

      const t = g.transition().duration(750);

      // Transition the data on all arcs, even the ones that aren’t visible,
      // so that if this transition is interrupted, entering arcs will start
      // the next transition from the desired position.
      path
        .transition(t)
        .tween('data', (d) => {
          const i = d3.interpolate(d.current, d.target);
          return (t) => (d.current = i(t));
        })
        .filter(function (d) {
          return +this.getAttribute('fill-opacity') || arcVisible(d.target);
        })
        .attr('fill-opacity', (d) => (arcVisible(d.target) ? (d.children ? 0.6 : 0.4) : 0))
        .attr('pointer-events', (d) => (arcVisible(d.target) ? 'auto' : 'none'))

        .attrTween('d', (d) => () => arc(d.current));

      label
        .filter(function (d) {
          return +this.getAttribute('fill-opacity') || labelVisible(d.target);
        })
        .transition(t)
        .attr('fill-opacity', (d) => +labelVisible(d.target))
        .attrTween('transform', (d) => () => labelTransform(d.current));
    }

    function arcVisible(d) {
      return d.y1 <= 3 && d.y0 >= 1 && d.x1 > d.x0;
    }

    function labelVisible(d) {
      return d.y1 <= 3 && d.y0 >= 1 && (d.y1 - d.y0) * (d.x1 - d.x0) > 0.03;
    }

    function labelTransform(d) {
      const x = (((d.x0 + d.x1) / 2) * 180) / Math.PI;
      const y = ((d.y0 + d.y1) / 2) * radius;
      return `rotate(${x - 90}) translate(${y},0) rotate(${x < 180 ? 0 : 180})`;
    }

    return svg.node();
  }

  useEffect(() => {
    document.querySelector('#pie-container').appendChild(drawChart());
  }, []);

  return (
    <>
      <div className={styles.pieContainer} id='pie-container'></div>
    </>
  );
}
