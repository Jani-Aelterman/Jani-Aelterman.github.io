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
import CodeIcon from '@mui/icons-material/Code';
import BuildIcon from '@mui/icons-material/Build';
import DirectionsBikeIcon from '@mui/icons-material/DirectionsBike';

const iconMap: Record<string, React.ReactNode> = {
    'Code': <CodeIcon />,
    'Build': <BuildIcon />,
    'DirectionsBike': <DirectionsBikeIcon />,
};

interface GitHubRepo {
    id: number;
    name: string;
    description: string;
    html_url: string;
    language: string;
    pushed_at: string;
    fork: boolean;
}

interface GitHubRelease {
    name: string;
    tag_name: string;
    html_url: string;
    published_at: string;
    repo_name: string;
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
    const [latestReleaseData, setLatestReleaseData] = React.useState<GitHubRelease | null>(null);

    React.useEffect(() => {
        // Fetch featured repositories defined in data.ts
        const contentConfig = content as any;
        if (contentConfig.github?.featuredRepos && contentConfig.github.featuredRepos.length > 0) {
            const repoPromises = contentConfig.github.featuredRepos.map((repoName: string) =>
                fetch(`https://api.github.com/repos/${contentConfig.site.copyrightName.replace(' ', '-')}/${repoName}`)
                    .then(res => res.ok ? res.json() : null)
            );

            Promise.all(repoPromises)
                .then(async (dataArray) => {
                    const validRepos = dataArray.filter(repo => repo !== null) as GitHubRepo[];
                    // Sort locally by pushed_at descending
                    validRepos.sort((a, b) => new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime());
                    setProjects(validRepos);

                    // If configured, fetch latest release for all these featured projects concurrently
                    if (contentConfig.latestRelease?.show && validRepos.length > 0) {
                        const releasePromises = validRepos.map((repo: GitHubRepo) =>
                            fetch(`https://api.github.com/repos/${contentConfig.site.copyrightName.replace(' ', '-')}/${repo.name}/releases/latest`)
                                .then(res => {
                                    if (!res.ok) throw new Error(`No release for ${repo.name}`);
                                    return res.json();
                                })
                                .then(releaseData => ({ ...releaseData, repo_name: repo.name } as GitHubRelease))
                        );

                        try {
                            const results = await Promise.allSettled(releasePromises);
                            const successfulReleases = results
                                .filter((result): result is PromiseFulfilledResult<GitHubRelease> => result.status === 'fulfilled')
                                .map(result => result.value);

                            if (successfulReleases.length > 0) {
                                // Sort by published_at descending to find the absolute latest
                                successfulReleases.sort((a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime());
                                setLatestReleaseData(successfulReleases[0]);
                            } else if (contentConfig.latestRelease?.fallbackRepo) {
                                // Fallback if none of the featured projects have a release
                                fetch(`https://api.github.com/repos/${contentConfig.site.copyrightName.replace(' ', '-')}/${contentConfig.latestRelease.fallbackRepo}/releases/latest`)
                                    .then(res => {
                                        if (!res.ok) throw new Error('Fallback release not found');
                                        return res.json();
                                    })
                                    .then(data => setLatestReleaseData({ ...data, repo_name: contentConfig.latestRelease.fallbackRepo }))
                                    .catch(err => console.error('Error fetching fallback release:', err));
                            }
                        } catch (error) {
                            console.error('Error processing releases:', error);
                        }
                    }
                })
                .catch(error => console.error('Error fetching GitHub repos:', error));
        }
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
                {/* Detailed About Section */}
                <Box sx={{ maxWidth: '800px', mt: 6, textAlign: 'left', display: 'flex', flexDirection: 'column', gap: 4 }}>
                    {(content.about as any)?.sections.map((section: any, index: number) => (
                        <Box key={index} sx={{ display: 'flex', gap: 2 }}>
                            <Box sx={{ color: 'primary.main', minWidth: 40, pt: 0.5 }}>
                                {iconMap[section.icon]}
                            </Box>
                            <Box>
                                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                                    {section.title}
                                </Typography>
                                <Typography variant="body1" color="text.secondary">
                                    {section.text}
                                </Typography>
                            </Box>
                        </Box>
                    ))}
                </Box>
            </Box>

            {/* Latest Release Banner */}
            {content.latestRelease?.show && latestReleaseData && (
                <Box id="latest-release" sx={{ mb: -4 }}>
                    <Card variant="outlined" sx={{
                        bgcolor: 'primary.main',
                        color: 'primary.contrastText',
                        border: 'none',
                        backgroundImage: 'linear-gradient(45deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0) 100%)'
                    }}>
                        <CardContent sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, alignItems: { xs: 'flex-start', sm: 'center' }, justifyContent: 'space-between', gap: 2 }}>
                            <Box>
                                <Typography variant="overline" sx={{ opacity: 0.8, fontWeight: 'bold', letterSpacing: 1 }}>
                                    LATEST RELEASE: {latestReleaseData.repo_name}
                                </Typography>
                                <Typography variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
                                    {latestReleaseData.name || latestReleaseData.tag_name}
                                </Typography>
                                <Typography variant="body2" sx={{ opacity: 0.9, mt: 0.5 }}>
                                    Published on {new Date(latestReleaseData.published_at).toLocaleDateString()}
                                </Typography>
                            </Box>
                            <IconButton
                                href={latestReleaseData.html_url}
                                target="_blank"
                                sx={{
                                    bgcolor: 'rgba(255,255,255,0.2)',
                                    color: 'inherit',
                                    '&:hover': { bgcolor: 'rgba(255,255,255,0.3)' }
                                }}
                            >
                                <GitHubIcon />
                            </IconButton>
                        </CardContent>
                    </Card>
                </Box>
            )}

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
                                <Box
                                    sx={{
                                        position: 'relative',
                                        width: '100%',
                                        height: 140,
                                        overflow: 'hidden',
                                        borderBottom: '1px solid',
                                        borderColor: 'divider',
                                    }}
                                >
                                    {/* Blurred Background */}
                                    <Box
                                        component="div"
                                        sx={{
                                            position: 'absolute',
                                            top: 0,
                                            left: 0,
                                            right: 0,
                                            bottom: 0,
                                            backgroundImage: `url(${(content.projectImages as Record<string, string>)[project.name] || '/default-project.svg'})`,
                                            backgroundSize: 'cover',
                                            backgroundPosition: 'center',
                                            filter: 'blur(8px) brightness(0.6)',
                                            transform: 'scale(1.1)', // Prevent blur edges
                                        }}
                                    />
                                    {/* Foreground Image */}
                                    <Box
                                        component="img"
                                        src={(content.projectImages as Record<string, string>)[project.name] || '/default-project.svg'}
                                        alt={project.name}
                                        sx={{
                                            position: 'relative',
                                            height: '100%',
                                            width: 'auto',
                                            minWidth: '140px', // Ensure at least square aspect ratio
                                            maxWidth: '100%',
                                            objectFit: 'cover', // Crop if aspect ratio forced
                                            zIndex: 1,
                                            display: 'block',
                                            margin: '0 auto',
                                        }}
                                    />
                                </Box>
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
