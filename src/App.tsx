
import { AppBar, Toolbar, Typography, Container, Grid, Card, CardContent, Button, CssBaseline } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';

function App() {
  return (
    <>
      {/* Zorgt voor een consistente reset van browser stijlen (Dark mode ready!) */}
      <CssBaseline />

      {/* De Navigatiebalk */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Mijn Portfolio
          </Typography>
          <Button color="inherit" startIcon={<GitHubIcon />}>GitHub</Button>
        </Toolbar>
      </AppBar>

      {/* De Inhoud */}
      <Container maxWidth="lg" sx={{ marginTop: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Welkom op mijn projecten pagina
        </Typography>

        <Grid container spacing={3}>
          {/* Voorbeeld Kaartje 1 */}
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <Card>
              <CardContent>
                <Typography variant="h5">Project Naam</Typography>
                <Typography color="text.secondary">React • Material UI</Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>
                  Hier komt straks automatisch de beschrijving van je GitHub repo of je 3D print.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default App;