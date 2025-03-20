import useAppNavigation from "../../shared/hooks/useAppNavigation.tsx";
import {Fragment, Suspense, use} from "react";
import {useNavigate} from "react-router";

type Release = {
    id: number,
    title: string,
    artist: string,
    releaseDate: string,
    tracks: string[]
};

async function loader() {
    return (await fetch(`http://localhost:3000/api/releases`)).json() as Promise<Release[]>;
}

type ReleaseListProps = {
    releases: ReturnType<typeof loader>
}

function ReleaseList({releases}: ReleaseListProps) {
    const navigate = useNavigate();
    const releasesList = use(releases);

    return <ul style={{
        display: "flex",
        flexDirection: "column",
        padding: 0,
        margin: 0,
        gap: '1rem'
    }}>
        {releasesList.map(release => <Fragment key={'release-identifier-' + release.id}>
            <li
                onClick={() => {
                    navigate(`/releases/${release.id}`)
                        ?.catch(e => console.error(e));
                }}
                style={{listStyle: "none", border: "1px solid gray", padding: "0.5rem"}}>
                <h4>{release.title}</h4>
                <small>{release.id}</small>
                <p>{release.artist}</p>
                <ol>
                    {release.tracks.map((t) =>
                        <li key={'release-track-' + (() => crypto.randomUUID())()}> {t} </li>)}
                </ol>
            </li>
        </Fragment>)}
    </ul>;

}

export default function ReleasesPage() {
    const {navigateBack, navigate} = useAppNavigation();

    const handleBackButton = () => {
        navigateBack()
            ?.catch(e => console.error(e))
    };

    const handleNewButton = () => {
        navigate("/releases/" + crypto.randomUUID() + "/new")
            ?.catch(e => console.error(e))
    };

    return (<>
        <nav style={{display: "flex", justifyContent: "space-between"}}>
            <button type="button" onClick={handleBackButton}>{"<- Back"}</button>
            <button type="button" onClick={handleNewButton}>New</button>
        </nav>
        <h1>Releases</h1>
        <Suspense fallback={<p>Loading...</p>}>
            <ReleaseList releases={loader()}/>
        </Suspense>
    </>)
}