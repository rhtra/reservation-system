import React, { Suspense, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { AppBar, Box, Button, Chip, CircularProgress, Container, CssBaseline, Stack, ThemeProvider, Toolbar, Typography, createTheme } from '@mui/material';
const Booking = React.lazy(() => import('booking/App'));
const Courts = React.lazy(() => import('courts/App'));
const Admin = React.lazy(() => import('admin/App'));
const theme = createTheme({ palette: { primary: { main: '#176B55' }, background: { default: '#F5F7F5' } }, shape: { borderRadius: 12 }, typography: { fontFamily: 'Inter, Arial, sans-serif' } });
function Shell() {
  const [page, setPage] = useState('booking');
  const tabs = [{ id: 'booking', label: 'Book a court' }, { id: 'courts', label: 'Explore courts' }, { id: 'admin', label: 'Admin' }];
  return <ThemeProvider theme={theme}><CssBaseline/><AppBar position="static" color="inherit" elevation={0} sx={{ borderBottom: '1px solid #e5e9e5' }}><Toolbar sx={{ maxWidth: 1200, width: '100%', mx: 'auto', gap: 2 }}><Typography variant="h5" fontWeight={900} color="primary.main">rally<span style={{color:'#E79A43'}}>.</span></Typography><Chip size="small" label="PICKLEBALL CLUB" variant="outlined"/><Box sx={{flex:1}}/><Stack direction="row" spacing={1}>{tabs.map(t=><Button key={t.id} onClick={()=>setPage(t.id)} variant={page===t.id?'contained':'text'}>{t.label}</Button>)}</Stack></Toolbar></AppBar><Container maxWidth="lg" sx={{py:5}}><Box sx={{mb:4}}><Typography variant="overline" color="primary" fontWeight={800}>PLAY MORE. PLAN LESS.</Typography><Typography variant="h3" fontWeight={850} sx={{mt:1}}>Your next game starts here.</Typography><Typography color="text.secondary" sx={{mt:1}}>Find a court, pick a time, and get your game on.</Typography></Box><Suspense fallback={<Stack alignItems="center" py={8}><CircularProgress/><Typography mt={2} color="text.secondary">Loading module…</Typography></Stack>}>{page==='booking'?<Booking/>:page==='courts'?<Courts/>:<Admin/>}</Suspense><Typography variant="caption" color="text.secondary" display="block" textAlign="center" sx={{mt:7}}>Rally Pickleball · Microfrontend demo</Typography></Container></ThemeProvider>;
}

createRoot(document.getElementById('root')!).render(<Shell/>);
