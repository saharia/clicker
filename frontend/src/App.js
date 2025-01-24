
import React, { useState, useEffect } from 'react';
import { Box, Card, CardContent, TextField, Button, Grid, Typography, Stack, InputAdornment, IconButton, CardHeader, Snackbar, Alert } from '@mui/material';

function App() {
    const [username, setUsername] = useState(''); // Replace with actual user ID logic
    const [userData, setUserData] = useState(null); // Replace with actual user ID logic
    const [score, setScore] = useState(0);
    const [prizes, setPrizes] = useState(0);
    const [message, setMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);
    const API_URL = process.env.REACT_APP_API_URL;
    const handleChange = (e) => {
      setUsername(e.target.value); // Update the state with the input value
    };

    const handleError = (error, isUpdate) => {
      setErrorMessage(null)
      if(isUpdate) {
        const message = error && error.message ? error.message : "Something went wrong";
        setErrorMessage(message)
      }
    };

    const logout = () => {
      setUserData(null);
    };

    const handleClick = async () => {
        handleError('', false);
      try {

        const response = await fetch(`${API_URL}api/click`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username }),
        });
        if (!response.ok) {
          handleError(await response.json(), true);
        } else {
          const data = await response.json();
          setScore(data.score);
          setPrizes(data.prizes);
          setMessage(data.reward ? `You earned ${data.reward} points!` : 'No bonus points this time!');
        }

      } catch (err) {
        console.error('Error:', err.message);
      }
    };

    const getUserData = async () => {
      handleError('', false);
      setMessage(null);
      try {
        const response = await fetch(`${API_URL}api/stats?username=${username}`, {
          headers: { 'Content-Type': 'application/json' },
      });
    
        if (!response.ok) {
          handleError(await response.json(), true);
        } else {
          const data = await response.json();
          setUserData(username);
          setScore(data.score);
          setPrizes(data.prizes);

        }
    
      } catch (err) {
        console.error('Error:', err.message);
      }
      
  };

  const handleClose = (
    event,
    reason,
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setErrorMessage(null);
  };

    return (
      <>
        <Box sx={{ flexGrow: 1, p: 3, bgcolor: '#f5f5f5', minHeight: '100vh' }}>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} md={6}>
            <Card>
            <CardHeader
              title="Clicker Game"
              color='primary'
              sx={{
                backgroundColor: 'primary.main', // Use theme's primary color
                color: 'primary.contrastText',  // Ensure text is visible
                borderBottom: '1px solid rgba(0, 0, 0, 0.12)', // Optional separator
              }}
              action={
                userData && <Button
                  variant="contained"
                  color="error"
                  onClick={logout}
                >
                  Logout
                </Button>
              }
            />
              <CardContent>
                <form>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                    
                    { !userData && <TextField
                      fullWidth
                      variant="outlined"
                      label="Enter Username"
                      value={username} // Controlled by state
                      onChange={handleChange} // Update state on change
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <Button
                                aria-label="Add"
                                edge="end"
                                color="primary"
                                variant="contained"
                                onClick={getUserData}
                            >
                                Submit
                            </Button>
                          </InputAdornment>
                        ),
                      }}
                    /> }

              { userData && <div>
                <Typography variant="h5" align="center" color='info' gutterBottom>
                Score: {score}
                </Typography>
                <Typography variant="h5" align="center" color='info' gutterBottom>
                Prizes: {prizes}
                </Typography>
                <Grid item xs={12}>
                <Button aria-label="Add"
                                edge="end"
                                color="primary"
                                variant="contained"
                                fullWidth
                                onClick={handleClick}>Click Me!</Button>
                </Grid>
              { message != '' && <Typography variant="h6" align="center" color='success' gutterBottom>
                {message}
                </Typography> }
            </div> }

                  </Grid>
                  </Grid>

                </form>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
        
      <Snackbar
        open={errorMessage}
        autoHideDuration={2000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <Alert 
        onClose={handleClose}
         severity="error" variant="filled"
         sx={{ width: '100%' }}>
          {errorMessage}
        </Alert>
      </Snackbar>
      </>
    );
}

export default App;
