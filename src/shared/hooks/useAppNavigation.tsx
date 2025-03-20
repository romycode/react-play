import {useNavigate} from "react-router";

export default function useAppNavigation() {
    const navigate = useNavigate()

    return {
        navigate,
        navigateBack: () => {
            navigate(-1)
                ?.catch(e => console.error(e))
        },
    }
}