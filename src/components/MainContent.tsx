import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import GitHubIcon from '@mui/icons-material/GitHub';
import IconButton from '@mui/material/IconButton';

import { content } from '../data';

interface GitHubRepo {
    id: number;
    name: string;
    description: string;
    html_url: string;
    language: string;
    pushed_at: string;
}

const StyledCard = styled(Card)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    padding: 0,
    height: '100%',
    backgroundColor: (theme.vars || theme).palette.background.paper,
    '&:hover': {
        backgroundColor: 'transparent',
        cursor: 'pointer',
    },
    '&:focus-visible': {
        outline: '3px solid',
        outlineColor: 'hsla(210, 98%, 48%, 0.5)',
        outlineOffset: '2px',
    },
}));

const StyledCardContent = styled(CardContent)({
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
    padding: 16,
    flexGrow: 1,
    '&:last-child': {
        paddingBottom: 16,
    },
});

export default function MainContent() {
    const [focusedCardIndex, setFocusedCardIndex] = React.useState<number | null>(null);
    const [projects, setProjects] = React.useState<GitHubRepo[]>([]);

    React.useEffect(() => {
        fetch(`https://api.github.com/users/${content.site.copyrightName.replace(' ', '-')}/repos?sort=pushed&direction=desc`)
            .then(response => response.json())
            .then(data => {
                // Filter out forked repos if desired, or just take the first 6
                const recentProjects = Array.isArray(data) ? data.slice(0, 6) : [];
                setProjects(recentProjects);
            })
            .catch(error => console.error('Error fetching GitHub repos:', error));
    }, []);

    const handleFocus = (index: number) => {
        setFocusedCardIndex(index);
    };

    const handleBlur = () => {
        setFocusedCardIndex(null);
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 8 }}>

            {/* Hero Section */}
            <Box id="about" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 2, my: 4 }}>
                <Typography variant="h1" gutterBottom sx={{ fontSize: { xs: '2.5rem', md: '4rem' } }}>
                    {content.hero.title} <span style={{ color: 'var(--mui-palette-primary-main)' }}>{content.hero.name}</span>
                </Typography>
                <Typography variant="h5" color="text.secondary" sx={{ maxWidth: '800px' }}>
                    {content.hero.tagline}
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, justifyContent: 'center', mt: 2 }}>
                    {content.hero.skills.map((skill) => (
                        <Chip key={skill} label={skill} variant="outlined" />
                    ))}
                </Box>
            </Box>

            {/* Projects Section */}
            <Box id="projects">
                <Typography variant="h4" gutterBottom>
                    Featured Projects
                </Typography>
                <Typography color="text.secondary" sx={{ mb: 4 }}>
                    Some of my recent code repositories on GitHub.
                </Typography>
                <Grid container spacing={2}>
                    {projects.map((project, index) => (
                        <Grid key={index} size={{ xs: 12, md: 4 }}>
                            <StyledCard
                                variant="outlined"
                                onFocus={() => handleFocus(index)}
                                onBlur={handleBlur}
                                tabIndex={0}
                                className={focusedCardIndex === index ? 'Mui-focused' : ''}
                            >
                                <StyledCardContent>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                        <Typography gutterBottom variant="h6" component="div">
                                            {project.name}
                                        </Typography>
                                        <IconButton href={project.html_url} target="_blank" size="small">
                                            <GitHubIcon />
                                        </IconButton>
                                    </Box>
                                    <Typography variant="body2" color="text.secondary" gutterBottom sx={{
                                        display: '-webkit-box',
                                        WebkitLineClamp: 3,
                                        WebkitBoxOrient: 'vertical',
                                        overflow: 'hidden'
                                    }}>
                                        {project.description || 'No description available.'}
                                    </Typography>
                                    <Box sx={{ mt: 'auto', pt: 2 }}>
                                        {project.language && <Chip label={project.language} size="small" color="primary" variant="outlined" />}
                                    </Box>
                                </StyledCardContent>
                            </StyledCard>
                        </Grid>
                    ))}
                </Grid>
            </Box>

            {/* 3D Printing Section */}
            <Box id="printing">
                <Typography variant="h4" gutterBottom>
                    3D Printing & Design
                </Typography>
                <Typography color="text.secondary" sx={{ mb: 4 }}>
                    My latest designs from Printables.
                </Typography>
                <Grid container spacing={2}>
                    {content.printables.map((item, index) => (
                        <Grid key={index} size={{ xs: 12, md: 6 }}>
                            <StyledCard
                                variant="outlined"
                                sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                            >
                                <Box
                                    sx={{
                                        width: '100%',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        bgcolor: 'background.default',
                                        pt: 2,
                                        pb: 0
                                    }}
                                >
                                    <Box
                                        component="iframe"
                                        src={`https://www.printables.com/embed/${item.id}`}
                                        width="300"
                                        height="340"
                                        scrolling="no"
                                        sx={{
                                            border: 'none',
                                            borderRadius: 1,
                                            overflow: 'hidden',
                                            backgroundColor: 'background.paper',
                                            display: 'block'
                                        }}
                                        title={`Printables Embed ${item.id}`}
                                        loading="lazy"
                                    />
                                </Box>
                                <StyledCardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
                                    <Typography gutterBottom variant="h6" component="div">
                                        {item.title}
                                    </Typography>
                                </StyledCardContent>
                            </StyledCard>
                        </Grid>
                    ))}
                </Grid>
            </Box>

        </Box>
    );
}
