import { useDispatch } from "react-redux";
import { orderApi } from "../redux/services/order.service";
import { plateApi } from "../redux/services/plate.service";
// import { restaruantApi } from "../redux/services/restaurant.service";
import { menuApi } from "../redux/services/menu.service";
import { tableApi } from "../redux/services/table.service";

const fixtures = [plateApi, menuApi]
const fixturesRest = [plateApi, orderApi, menuApi, tableApi]
export function useEventTags() {
    const dispatch = useDispatch();

    function dispatchsEvent(event = [null]) {
        fixtures.forEach((api) => dispatch(api.util.invalidateTags(event)))
    }

    function dispatchRestIdEvent(event = ["RestaurantId"]) {
        fixturesRest.forEach((api) => dispatch(api.util.invalidateTags(event)))
    }

    return {
        dispatchsEvent,
        dispatchRestIdEvent
    }
}