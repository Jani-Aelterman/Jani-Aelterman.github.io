import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import AppTheme from './theme/AppTheme.tsx';
import AppAppBar from './components/AppAppBar.tsx';
import MainContent from './components/MainContent.tsx';
//import Latest from './components/Latest';
import Footer from './components/Footer.tsx';

export default function Blog(props: { disableCustomTheme?: boolean }) {
  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />

      <AppAppBar />
      <Container
        maxWidth="lg"
        component="main"
        sx={{ display: 'flex', flexDirection: 'column', my: 16, gap: 4 }}
      >
        <MainContent />
        {/*<Latest />*/}
      </Container>
      <Footer />
    </AppTheme>
  );
}









/*import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import GitHubIcon from '@mui/icons-material/GitHub';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AppAppBar from './components/AppBar';
import MainFeaturedPost from './components/MainFeaturedPost';
import FeaturedPost from './components/FeaturedPost';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';



const mainFeaturedPost = {
  title: 'Welkom op mijn projecten pagina',
  description:
    "Mijn Portfolio - Een overzicht van mijn projecten, 3D prints en code repositories.",
  image: 'https://source.unsplash.com/random?wallpapers',
  imageText: 'main image description',
  linkText: 'Continue reading…',
};

const featuredPosts = [
  {
    title: 'Project Naam',
    date: 'Nov 12',
    description:
      'Hier komt straks automatisch de beschrijving van je GitHub repo of je 3D print. React • Material UI',
    image: 'https://source.unsplash.com/random?wallpapers',
    imageLabel: 'Image Text',
  },
  {
    title: 'Post Title',
    date: 'Nov 11',
    description:
      'This is a wider card with supporting text below as a natural lead-in to additional content.',
    image: 'https://source.unsplash.com/random?wallpapers',
    imageLabel: 'Image Text',
  },
];

const sidebar = {
  title: 'About',
  description:
    'Jani Aelterman - GitHub User. Passionate about coding and 3D printing.',
  archives: [
    { title: 'March 2020', url: '#' },
    { title: 'February 2020', url: '#' },
    { title: 'January 2020', url: '#' },
    { title: 'November 1999', url: '#' },
    { title: 'October 1999', url: '#' },
    { title: 'September 1999', url: '#' },
    { title: 'August 1999', url: '#' },
    { title: 'July 1999', url: '#' },
    { title: 'June 1999', url: '#' },
    { title: 'May 1999', url: '#' },
    { title: 'April 1999', url: '#' },
  ],
  social: [
    { name: 'GitHub', icon: GitHubIcon },
    { name: 'Twitter', icon: TwitterIcon },
    { name: 'Facebook', icon: FacebookIcon },
  ],
};

const defaultTheme = createTheme({
  cssVariables: true,
  colorSchemes: {
    light: true,
    dark: true,
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1200,
      xl: 1536,
    },
  },
});

export default function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <AppAppBar />
      <Container maxWidth="lg" sx={{ mt: 14 }}>
        <main>
          <MainFeaturedPost post={mainFeaturedPost} />
          <Grid container spacing={4}>
            {featuredPosts.map((post) => (
              <FeaturedPost key={post.title} post={post} />
            ))}
          </Grid>
          <Grid container spacing={5} sx={{ mt: 3 }}>
            <Grid size={{ xs: 12, md: 8 }} sx={{ '& .markdown': { py: 3 } }}>
              <h3>More Projects...</h3>
            </Grid>
            <Sidebar
              title={sidebar.title}
              description={sidebar.description}
              archives={sidebar.archives}
              social={sidebar.social}
            />
          </Grid>
        </main>
      </Container>
      <Footer />
    </ThemeProvider>
  );
}*/