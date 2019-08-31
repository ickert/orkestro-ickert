
import drivers from 'mockData/drivers';
import distance from './distance';
export interface Driver {
  id: string;
  name: string;
  position: number[];
}

// tslint:disable-next-line:no-any
const normalize = (driver: any) => ({
  id: driver.id,
  name: driver.name,
  position: [parseFloat(driver.long), parseFloat(driver.lat)],
});

const mapDistance = (driver: any, point: any) => {
	return {
		...driver,
		position: [parseFloat(driver.long), parseFloat(driver.lat)],
		distance: distance(driver.lat, driver.long, point.lat, point.long )
	}
}

export const getDriverList = () => {
    return drivers.map(normalize)
}


export const getClosestDriverListFromOrder = (order, numberClosest = 3) => {
	if (!order) {
		return []
	}
	const withDistance = drivers.map(driver => mapDistance(driver, order))
	const sort = withDistance.sort(({distance: distanceA},{distance: distanceB}) => distanceA > distanceB ? 1 : distanceA === distanceB ? 0 : -1).slice(0, numberClosest)
	return sort
}

