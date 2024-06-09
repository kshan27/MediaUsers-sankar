import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import UsersTable from '../../components/users/usersTable';

export default function UsersGrid() {

  return (
    <Box
        id="hero"
        sx={{
            width: '100%',
            backgroundSize: '100% 20%',
        }}
    >
        <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          pt: { xs: 14, sm: 20 },
          pb: { xs: 8, sm: 12 },
        }}
      >
        <Stack spacing={2} useFlexGap sx={{ width: { xs: '100%', sm: '70%' } }}>
        <Typography
            variant="h2"
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              alignSelf: 'center',
              textAlign: 'center',
              fontSize: 'clamp(3.5rem, 10vw, 4rem)',
            }}
          >
            Users 
          </Typography>
          <UsersTable />
        </Stack>

      </Container>
    </Box>
  );
}