import { useState } from "react";

const LANGUAGES = ['English', 'Spanish', 'French', 'German', 'Chinese', 'Hindi'];
const HOBBIES = ['Music', 'Travel', 'Sports', 'Reading', 'Cooking', 'Art', 'Gaming', 'Photography'];


interface AdditionalInfoProps { 
    onNext: () => void;
    onBack: () => void;
}

export const useAdditionalInfo = ({ onNext, onBack }: AdditionalInfoProps) => {
    const [bio, setBio] = useState('');
    const [occupation, setOccupation] = useState('');
    const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
    const [selectedHobbies, setSelectedHobbies] = useState<string[]>([]);


    const toggleSelection = (item: string, list: string[], setList: (items: string[]) => void) => {
        if (list.includes(item)) {
            setList(list.filter(i => i !== item));
        } else {
            setList([...list, item]);
        }
    };

    const handleContinue = () => {
        if (bio && occupation && selectedLanguages.length > 0 && selectedHobbies.length > 0) {
            onNext();
        }
    };


    return {
        bio,
        occupation,
        selectedLanguages,
        selectedHobbies,
        toggleSelection,
        handleContinue,
        setBio,
        LANGUAGES,
        HOBBIES,
        setOccupation,
        setSelectedLanguages,
        setSelectedHobbies,
    };
};
