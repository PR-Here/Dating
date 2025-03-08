import { useState } from "react";
import DateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';
export const usePersonalDetails = () => {
    const [name, setName] = useState('');
    const [dob, setDob] = useState<Date | null>(null);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [gender, setGender] = useState('');
    const [image, setImage] = useState('');

    const handleImagePick = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const handleDateChange = (event: any, selectedDate?: Date) => {
        setShowDatePicker(false);
        if (selectedDate) {
            setDob(selectedDate);
        }
    };

    const formatDate = (date: Date) => {
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    const isValid = name && dob && gender && image;


    return {
        name,
        dob,
        showDatePicker,
        gender,
        image,
        handleImagePick,
        handleDateChange,
        formatDate,
        isValid,
        setName,
        setDob,
        setShowDatePicker,
        setGender,
        setImage,
    }
}