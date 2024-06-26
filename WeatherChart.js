import moment from 'moment'
import { Chart, Line, Area, HorizontalAxis, VerticalAxis } from 'react-native-responsive-linechart'

const WeatherChart = ({yDomain, values, hours, color}) => {
    const data = values.map((value, index) => {
        return {x: index, y: value}
    })

    const dateFormater = (dateString) => {
        const date = new Date(dateString);
        if (date.getHours() === 0) {
            return moment(date).format('DD/MM');
        } else {
            return moment(date).format('hh:mm');
        }
    }

    const getHour= () => {
        const nowDate = new Date()
        let hours = nowDate.getHours()
        const minutes = nowDate.getMinutes()
        hours = hours + minutes / 60
        return hours
    }

    return (
        <Chart
            style={{ height: '30vh', width: '100vw' }}
            data={data}
            padding={{ left: 40, bottom: 20, right: 20, top: 20 }}
            xDomain={{ min: 0, max: 48 }}
            yDomain={yDomain}
        >
            <VerticalAxis tickCount={11} theme={{ labels: { formatter: (v) => v.toFixed(2) } }} />
            <HorizontalAxis tickCount={17} theme={{ labels: { formatter: (i) => dateFormater(hours[i]) } }}/>
            <Area data={data} theme={{ gradient: { from: { color: color.from }, to: { color: color.to, opacity: 0.4 } }}} />
            <Line data={data} theme={{ stroke: { color: color.line, width: 5 }, scatter: { default: { width: 4, height: 4, rx: 2 }} }} />
            <Line data={[{x: getHour(), y: yDomain.min}, {x: getHour(), y: yDomain.max}]}
                theme={{ stroke: { color: 'red', width : 3}}}/>
        </Chart>
    )
}

export default WeatherChart;