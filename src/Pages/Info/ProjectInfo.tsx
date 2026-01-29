import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, CircularProgress, Paper, Divider, Button } from '@mui/material';
import { type SiteContent, fetchSiteContent } from '../../api/content';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const ProjectInfo: React.FC = () => {
    const [contents, setContents] = useState<SiteContent[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const loadContent = async () => {
            try {
                const data = await fetchSiteContent();
                setContents(data);
            } catch (err) {
                setError('Impossibile caricare le informazioni del progetto.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        loadContent();
    }, []);

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Container sx={{ mt: 5 }}>
                <Typography color="error">{error}</Typography>
            </Container>
        );
    }

    return (
        <Container maxWidth="lg" sx={{ py: 8 }}>
            <Button
                startIcon={<ArrowBackIcon />}
                onClick={() => navigate('/')}
                sx={{ mb: 6, color: '#555', fontWeight: 600 }}
            >
                Indietro
            </Button>

            <Box sx={{ textAlign: 'center', mb: 8 }}>
                <Typography variant="h3" component="h1" fontWeight={800} gutterBottom sx={{ color: '#0F172A' }}>
                    Chi Siamo e Cosa Facciamo
                </Typography>
                <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 700, mx: 'auto', lineHeight: 1.6 }}>
                    MedCheck è la soluzione innovativa per la tua salute quotidiana.
                </Typography>
            </Box>

            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
                {contents.map((item, index) => (
                    <Paper
                        key={item.id}
                        elevation={0}
                        sx={{
                            p: 5,
                            borderRadius: 6,
                            bgcolor: index % 2 === 0 ? '#F8FAFC' : '#FFFFFF',
                            border: '1px solid',
                            borderColor: index % 2 === 0 ? 'transparent' : '#E2E8F0',
                            height: '100%',
                            transition: 'transform 0.2s',
                            '&:hover': {
                                transform: 'translateY(-4px)',
                                boxShadow: '0 10px 40px -10px rgba(0,0,0,0.08)'
                            }
                        }}
                    >
                        <Typography variant="h5" component="h2" fontWeight={700} gutterBottom sx={{ color: '#2E6BFF', mb: 2 }}>
                            {item.title}
                        </Typography>
                        <Box sx={{
                            whiteSpace: 'pre-line',
                            lineHeight: 1.8,
                            color: '#475569',
                            fontSize: '1.05rem'
                        }}>
                            {(item.content || '').split('\\n').map((line, index) => (
                                <React.Fragment key={index}>
                                    {line.startsWith('**') ?
                                        <Typography component="span" display="block" fontWeight={700} sx={{ mt: 2, mb: 0.5, color: '#1E293B' }}>
                                            {line.replace(/\*\*/g, '')}
                                        </Typography>
                                        :
                                        <>
                                            {line}
                                            <br />
                                        </>
                                    }
                                </React.Fragment>
                            ))}
                        </Box>
                    </Paper>
                ))}
            </Box>
        </Container>
    );
};

export default ProjectInfo;
