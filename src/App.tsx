import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { TeamPage } from './pages/TeamPage';
import { CurrentStudents } from './pages/CurrentStudents';
import { ResourcesPage } from './pages/ResourcesPage';
import { Contact } from './pages/Contact';
import { GalleryPage } from './pages/GalleryPage';
import { AdminLogin } from './pages/admin/AdminLogin';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { ManageExecutives } from './pages/admin/ManageExecutives';
import { ManageStudents } from './pages/admin/ManageStudents';
import { ManageGallery } from './pages/admin/ManageGallery';
import { ManageUpcomingEvents } from './pages/admin/ManageUpcomingEvents';
import { ResourceManagement } from './pages/admin/ResourceMangement';

import  PrivateRoute  from './components/PrivateRoute';


function App() {
  return (
    <Router basename="/">
      <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/current-students" element={<CurrentStudents />} />
          <Route path="/resources" element={<ResourcesPage/>} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          {/* <PrivateRoute path="/admin/dashboard" element={<AdminDashboard/>} /> */}
          <Route element={<PrivateRoute />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/executives" element={<ManageExecutives />} />
            <Route path="/admin/students" element={<ManageStudents />} />
            <Route path="/admin/gallery" element={<ManageGallery />} />
            <Route path="/admin/upcoming-events" element={<ManageUpcomingEvents />} />
            <Route path="/admin/resources" element={<ResourceManagement />} />
          </Route>
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;