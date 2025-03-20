import {useState} from "react";

import useAppNavigation from "~/shared/hooks/useAppNavigation.tsx";
import Input from "~/shared/components/Input.tsx";

type Release = { title: string; };
type ReleaseErrors = Record<keyof Release, string | null>


function useNewRelease() {
    const [release, setRelease] = useState<Release>({title: ""});
    const [errors, setErrors] = useState<ReleaseErrors>({
        title: null
    });

    const validateRelease = (newRelease: Partial<Release>): boolean => {
        let valid = false;
        let error: string | null = null

        if (newRelease.title !== undefined) {
            error = validateReleaseField("title", newRelease.title);
            setErrors(prev => ({...prev, title: error}));
            valid = false
        }

        return valid
    };

    const validateReleaseField = (field: string, value: string): string => {
        switch (field) {
            case "title":
                if (value === "") return "Title is required";
                return ""
            default:
                return ""
        }
    };

    const updateRelease = (release: Partial<Release>) => {
        validateRelease(release)
        setRelease(prevState => ({...prevState, ...release} satisfies Release))
    };

    return {release, errors, updateRelease, validateRelease};
}

export default function NewReleasePage() {
    const {navigateBack} = useAppNavigation();

    const {release, errors, updateRelease, validateRelease} = useNewRelease();

    return <>
        <nav>
            <button type="button" onClick={navigateBack}>{"<- Back"}</button>
        </nav>
        <h1>New Release</h1>
        <form action={() => {
            validateRelease(release)
        }}>
            <Input
                label="Title"
                error={errors.title}
                value={release.title}
                onChange={(title) => {
                    updateRelease({title})
                }}
            />
            <button type="submit">Validate</button>
        </form>
    </>
}