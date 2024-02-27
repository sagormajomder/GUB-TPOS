import { NavigateFunction, Location, useNavigate } from "react-router-dom";

interface INavigation{
    navigate: NavigateFunction,
    location: null | Location
}
export const history: INavigation = {
    navigate: useNavigate,
    location: null
};