import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { content } from '../data';

const LogoContainer = styled(Box)(({ theme }) => ({
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '4px 12px',
    border: `2px solid ${(theme.vars || theme).palette.primary.main}`,
    borderRadius: '8px',
    //backgroundColor: (theme.vars || theme).palette.primary.main,
    //color: (theme.vars || theme).palette.primary.contrastText,
    color: (theme.vars || theme).palette.primary.main,
    fontWeight: 'bold',
    letterSpacing: '1px',
    transition: 'all 0.3s ease',
    '&:hover': {
        backgroundColor: (theme.vars || theme).palette.primary.main,
        color: (theme.vars || theme).palette.primary.contrastText,
        boxShadow: `0 0 12px ${(theme.vars || theme).palette.primary.main}`,
    }
}));

export default function Logo() {
    return (
        <LogoContainer>
            <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', lineHeight: 1 }}>
                {content.site.logo}
            </Typography>
        </LogoContainer>
    );
}
