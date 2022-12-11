import { useDispatch } from "react-redux";
import { plateApi } from "../redux/services/plate.service";
import { restaruantApi } from "../redux/services/restaurant.service";

const fixtures = [plateApi, restaruantApi]
export function useEventTags() {
    const dispatch = useDispatch();

    function dispatchsEvent(event = [null]) {
        fixtures.forEach((api) => dispatch(api.util.invalidateTags(event)))
    }

    return {
        dispatchsEvent
    }
}