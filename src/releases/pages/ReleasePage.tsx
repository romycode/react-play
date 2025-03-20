import useAppNavigation from "../../shared/hooks/useAppNavigation.tsx";
import {useEffect, useState} from "react";
import {useParams} from "react-router";


export default function ReleasePage() {
    const {id} = useParams();
    const {navigateBack} = useAppNavigation();

    const [release, setRelease] = useState({});

    useEffect(() => {
        fetch(`http://localhost:3000/api/releases/${id}`)
            .then(r => r.json())
            .then(r =>  setRelease(r))
            .catch(err => console.error(err));
    }, [id])

    return <>
        <nav>
            <button onClick={navigateBack}>{"<- Back"}</button>
        </nav>
        <h1>Release</h1>
        <code>
            {JSON.stringify(release, null, 2)}
        </code>
    </>
}