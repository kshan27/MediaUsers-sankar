import * as React from 'react';
import FormControl from '@mui/material/FormControl';
import NativeSelect  from '@mui/material/NativeSelect';
import InputLabel from '@mui/material/InputLabel';
import { Button } from '@mui/material';

export default function GetLocationsDropDown({userId, updateLocation, cancelUpdate}) {
    const [location, setLocation] = React.useState('');
    const locations = [
        "ABU DHABI",
        "AMSTERDAM",
        "AUSTIN",
        "BARCELONA",
        "BENGALURU",
        "BRASÍLIA",
        "BRUSSELS",
        "BUENOS AIRES"
    ];

    const locationChange = (e) => {
        setLocation(e.target.value);
    }

    return (
        <div >
           <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel variant="standard" htmlFor="uncontrolled-native">
                Change Location
            </InputLabel>
            <NativeSelect
                inputProps={{
                name: 'location',
                id: 'uncontrolled-native',
                }}
                onChange={locationChange}
            >
            {
                locations.map((location, index) => <option value={location} key={index} aria-label='{location}'> {location} </option>)
            }
            </NativeSelect>
           </FormControl>
           <FormControl sx={{ m:1, minWidth: 120 }}>
                <Button 
                        size="small"
                        onClick={(e) => updateLocation(userId, location)}
                >
                    Save 
                </Button> 
                <Button 
                    size="small"
                    onClick={(e) => cancelUpdate(userId)}>
                   Cancel 
                </Button>
            </FormControl>
        </div>
    );
}