import {useState} from "react";

import useAppNavigation from "~/shared/hooks/useAppNavigation.tsx";
import Input from "~/shared/components/Input.tsx";

export default function NewReleasePage() {
    const {navigateBack} = useAppNavigation();

    const [release, setRelease] = useState<{ title: string; }>({title: ""});

    const validateReleaseTitle = (title: string): string => {
        if (title === "") return "Title is required";
        return ""
    };

    const updateReleaseTitle = (title: string) => {
        setRelease(prevState => ({...prevState, title}))
    };

    return <>
        <nav>
            <button type="button" onClick={navigateBack}>{"<- Back"}</button>
        </nav>
        <h1>New Release</h1>
        <form>
            <Input
                onChange={updateReleaseTitle}
                value={release.title}
                defaultValue=""
                label="Title"
                validate={validateReleaseTitle}
            />
        </form>
    </>
}