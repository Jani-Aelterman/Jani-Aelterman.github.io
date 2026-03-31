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
import { useLanguage } from '../LanguageContext';
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
    const { t, config } = useLanguage();
    const [focusedCardIndex, setFocusedCardIndex] = React.useState<number | null>(null);
    const [projects, setProjects] = React.useState<GitHubRepo[]>([]);
    const [latestReleaseData, setLatestReleaseData] = React.useState<GitHubRelease | null>(null);

    React.useEffect(() => {
        // 1. Fetch Dynamic Repositories for the Grid (excluding specific ones)
        fetch(`https://api.github.com/users/${config.site.copyrightName.replace(' ', '-')}/repos?sort=pushed&direction=desc`)
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) {
                    const excluded = config.github?.excludeRepos || [];
                    const featured = config.github?.featuredRepos || [];
                    const validRepos = data.filter((repo: GitHubRepo) => (!repo.fork || featured.includes(repo.name)) && !excluded.includes(repo.name));
                    setProjects(validRepos.slice(0, 6));
                }
            })
            .catch(error => console.error('Error fetching latest GitHub repos:', error));

        // 2. Fetch Latest Release for the Featured Repos
        if (config.latestRelease?.show && config.github?.featuredRepos) {
            const releasePromises = config.github.featuredRepos.map((repoName: string) =>
                fetch(`https://api.github.com/repos/${config.site.copyrightName.replace(' ', '-')}/${repoName}/releases?per_page=1`)
                    .then(res => {
                        if (!res.ok) throw new Error(`No release for ${repoName}`);
                        return res.json();
                    })
                    .then(releases => {
                        if (!Array.isArray(releases) || releases.length === 0) throw new Error(`No release for ${repoName}`);
                        return { ...releases[0], repo_name: repoName } as GitHubRelease;
                    })
            );

            Promise.allSettled(releasePromises).then(results => {
                const successfulReleases = results
                    .filter((result): result is PromiseFulfilledResult<GitHubRelease> => result.status === 'fulfilled')
                    .map(result => result.value);

                if (successfulReleases.length > 0) {
                    successfulReleases.sort((a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime());
                    setLatestReleaseData(successfulReleases[0]);
                } else if (config.latestRelease?.fallbackRepo) {
                    fetch(`https://api.github.com/repos/${config.site.copyrightName.replace(' ', '-')}/${config.latestRelease.fallbackRepo}/releases?per_page=1`)
                        .then(res => res.ok ? res.json() : null)
                        .then(releases => {
                            if (releases && Array.isArray(releases) && releases.length > 0) {
                                setLatestReleaseData({ ...releases[0], repo_name: config.latestRelease.fallbackRepo });
                            }
                        })
                        .catch(err => console.error('Error fetching fallback release:', err));
                }
            });
        }
    }, [config.site.copyrightName, config.github, config.latestRelease]);

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
                    {t.hero.title} <span style={{ color: 'var(--mui-palette-primary-main)' }}>{config.site.title}</span>
                </Typography>
                <Typography variant="h5" color="text.secondary" sx={{ maxWidth: '800px' }}>
                    {t.hero.tagline}
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, justifyContent: 'center', mt: 2 }}>
                    {t.hero.skills.map((skill) => (
                        <Chip key={skill} label={skill} variant="outlined" />
                    ))}
                </Box>
                {/* Detailed About Section */}
                <Box sx={{ maxWidth: '800px', mt: 6, textAlign: 'left', display: 'flex', flexDirection: 'column', gap: 4 }}>
                    {t.about.sections.map((section: any, index: number) => (
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
            {config.latestRelease?.show && latestReleaseData && (
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
                                    {t.labels.latestRelease}: {latestReleaseData.repo_name}
                                </Typography>
                                <Typography variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
                                    {latestReleaseData.name || latestReleaseData.tag_name}
                                </Typography>
                                <Typography variant="body2" sx={{ opacity: 0.9, mt: 0.5 }}>
                                    {t.labels.publishedOn} {new Date(latestReleaseData.published_at).toLocaleDateString()}
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
                    {t.labels.featuredProjects}
                </Typography>
                <Typography color="text.secondary" sx={{ mb: 4 }}>
                    {t.labels.featuredProjectsDesc}
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
                                            backgroundImage: `url(${(config.projectImages as Record<string, string>)[project.name] || '/default-project.svg'})`,
                                            backgroundSize: 'cover',
                                            backgroundPosition: 'center',
                                            filter: 'blur(8px) brightness(0.6)',
                                            transform: 'scale(1.1)', // Prevent blur edges
                                        }}
                                    />
                                    {/* Foreground Image */}
                                    <Box
                                        component="img"
                                        src={(config.projectImages as Record<string, string>)[project.name] || '/default-project.svg'}
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
                                        {project.description || t.labels.noDescription}
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
                    {t.labels.printingHeading}
                </Typography>
                <Typography color="text.secondary" sx={{ mb: 4 }}>
                    {t.labels.printingDesc}
                </Typography>
                <Grid container spacing={2}>
                    {t.printables.map((item, index) => (
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
