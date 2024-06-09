import * as React from 'react';
import { Toolbar, alpha, Typography, ListItem, ListItemText, Box, Stack, Divider } from '@mui/material';
import { useSelector } from 'react-redux';
import type { RootState } from '../../app/store'
import type { UserData } from './interface';
import { List } from '@mui/icons-material';


export default function EnhancedTableToolbar() {

    const [usersByLoc, setUsersByLoc] = React.useState(new Map());
    const rows = useSelector((state: RootState) => {
        return state.user.users;
    });

    const groupUsersByLoc = () => {
        if (!rows) {
            return;
        }
        const locMap = new Map();
        rows.forEach((user: UserData, index: number) => {
            const location = user.location;
            console.log(`Users by Location : ${location}, user: ${user.name}`);
            if(locMap.has(location)) {
                const numUsers = locMap.get(location);
                locMap.set(location, numUsers + 1);
            } else {
                locMap.set(location, 1);
            }
        })

        setUsersByLoc(locMap);
    }

    React.useEffect(() => {
        groupUsersByLoc();
    }, [rows]);

    return (
        <Box alignItems="left">
        <Typography
            sx={{ flex: "1 1 100%" }}
            variant="h6"
            id="tableTitle"
            component="div"
        >
            Users by location
        </Typography>
        <Stack  direction='column'
                spacing={0.5}
                divider={<Divider orientation="horizontal" flexItem />}
                alignItems="flex-start"
                justifyContent="flex-start"

        >

        {
            Array.from(usersByLoc.entries()).sort().map(([_location, _numUsers]) => {
                return <div key={_location}> {_location} : {_numUsers} </div>
            })
        }
      </Stack>
      </Box>
    )
}