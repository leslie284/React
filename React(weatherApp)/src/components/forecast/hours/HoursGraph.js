import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@vx/grid';
import { LinearGradient } from '@vx/gradient';
import { Group } from '@vx/group';
import { curveMonotoneX } from '@vx/curve';
import { AxisLeft, AxisBottom } from '@vx/axis';
import { AreaClosed, LinePath } from '@vx/shape';
import { scaleTime, scaleLinear } from '@vx/scale';
import { GlyphDot } from '@vx/glyph';
import { extent, max, min } from 'd3-array';
import { numTicksForHeight, numTicksForWidth, width, height, margin, xMax, yMax, cToF } from '../../../helpers';
import moment from 'moment';

const HoursGraph = (props) => {

  const data = props.data.slice(0, 7);
  let y;

  if (props.temp === 'celsius') {
    y = d => d.main.temp_max;
  } else {
    y = d => cToF(d.main.temp_max);
  }

  const x = d => moment(d.dt_txt)._d;

  const xScale = scaleTime({
    range: [0, xMax],
    domain: extent(data, x)
  });
  const yScale = scaleLinear({
    range: [yMax, 0],
    domain: [min(data, y) - 5, max(data, y) + 5]
  });

  const tempUnit = props.temp === 'celsius' ? '°C' : '°F';

  return (
    <svg width={width} height={height}>
      <LinearGradient
        from='#ff6600'
        to='#00aaff'
        id='gradient'
      />
      <Grid
        top={margin.top}
        left={margin.left}
        xScale={xScale}
        yScale={yScale}
        stroke="#ccc"
        width={xMax}
        height={yMax}
        numTicksRows={numTicksForHeight(height)}
        numTicksColumns={numTicksForWidth(width)}
      />
      <Group top={margin.top} left={margin.left}>
        <AxisBottom
          scale={xScale}
          top={yMax}
          label={'Hours'}
          stroke={'black'}
          tickTextFill={'#ccc'}
        />
        <AreaClosed
          data={data}
          xScale={xScale}
          yScale={yScale}
          x={x}
          y={y}
          strokeWidth={2}
          stroke={'transparent'}
          fill={'url(#gradient)'}
          curve={curveMonotoneX}
        />
        <AxisLeft
          scale={yScale}
          top={0}
          left={0}
          label={'Temperature (' + tempUnit + ')' }
          stroke={'black'}
          tickTextFill={'#ccc'} />
        <LinePath
          data={data}
          xScale={xScale}
          yScale={yScale}
          x={x}
          y={y}
          stroke='#0099ff'
          strokeWidth={2}
          curve={curveMonotoneX}
          glyph={(d,i) => {
            return (
              <g key={`line-point-${i}`}>
                <GlyphDot
                  cx={xScale(x(d))}
                  cy={yScale(y(d))}
                  r={8}
                  fill='#fff'
                  stroke='#0099ff'
                  strokeWidth={2}
                >
                  <text
                    x={xScale(x(d))}
                    y={yScale(y(d))}
                    dx={-5}
                    dy={-15}
                    fill={"#0099ff"}
                    fontSize={14}
                  >
                    {props.temp === 'celsius' ? Math.round(d.main.temp_max) + tempUnit : Math.round(cToF(d.main.temp_max)) + tempUnit}
                  </text>
                </GlyphDot>
                <GlyphDot
                  cx={xScale(x(d))}
                  cy={yScale(y(d))}
                  r={3}
                  fill='#0099ff'
                />
              </g>
            );
          }}
        />
      </Group>
    </svg>
  );
}

HoursGraph.propTypes = {
  data: PropTypes.array.isRequired,
  temp: PropTypes.string.isRequired
}

export default HoursGraph;