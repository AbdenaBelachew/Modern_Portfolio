import { defaultProjects } from '../data/projects';

const PROJECTS_KEY = 'portfolio_projects';
const INQUIRIES_KEY = 'portfolio_inquiries';
const SEED_VERSION_KEY = 'portfolio_seed_version';
const SEED_VERSION = 3;

function canUseStorage() {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
}

function read(key, fallback) {
  if (!canUseStorage()) return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw);
    return parsed ?? fallback;
  } catch {
    return fallback;
  }
}

function write(key, value) {
  if (!canUseStorage()) return;
  window.localStorage.setItem(key, JSON.stringify(value));
  window.dispatchEvent(new Event('portfolio-data'));
}

function normalizeProject(project) {
  const parseList = (value) => {
    if (Array.isArray(value)) return value;
    if (typeof value === 'string') {
      const trimmed = value.trim();
      if (!trimmed) return [];
      try {
        const parsed = JSON.parse(trimmed);
        return Array.isArray(parsed) ? parsed : trimmed.split(',').map((item) => item.trim());
      } catch {
        return trimmed.split(',').map((item) => item.trim());
      }
    }
    return [];
  };

  return {
    ...project,
    tech: parseList(project.tech),
    gallery_images: parseList(project.gallery_images),
    metrics: parseList(project.metrics),
  };
}

function mergeDefaultMedia(projects) {
  const defaultsById = Object.fromEntries(defaultProjects.map((project) => [project.id, project]));
  return projects.map((project) => {
    const fallback = defaultsById[project.id];
    if (!fallback) return project;
    return {
      ...project,
      image_url: project.image_url || fallback.image_url,
      gallery_images:
        Array.isArray(project.gallery_images) && project.gallery_images.length > 0
          ? project.gallery_images
          : fallback.gallery_images,
    };
  });
}

function seedProjects() {
  if (!canUseStorage()) return defaultProjects.map(normalizeProject);

  const raw = window.localStorage.getItem(PROJECTS_KEY);
  const storedVersion = window.localStorage.getItem(SEED_VERSION_KEY);

  if (raw === null || storedVersion !== String(SEED_VERSION)) {
    const parsed = raw ? (() => {
      try {
        const value = JSON.parse(raw);
        return Array.isArray(value) ? value : defaultProjects;
      } catch {
        return defaultProjects;
      }
    })() : defaultProjects;

    const merged = mergeDefaultMedia(parsed.map(normalizeProject));
    const knownIds = new Set(parsed.map((project) => project.id));
    const extras = defaultProjects.filter((project) => !knownIds.has(project.id));
    const next = [...merged, ...extras.map(normalizeProject)];
    write(PROJECTS_KEY, next);
    window.localStorage.setItem(SEED_VERSION_KEY, String(SEED_VERSION));
    return next;
  }

  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      write(PROJECTS_KEY, defaultProjects);
      return defaultProjects.map(normalizeProject);
    }
    return parsed.map(normalizeProject);
  } catch {
    write(PROJECTS_KEY, defaultProjects);
    return defaultProjects.map(normalizeProject);
  }
}

export function getProjects() {
  return seedProjects().sort((a, b) => {
    const aDate = new Date(a.created_at || 0).getTime();
    const bDate = new Date(b.created_at || 0).getTime();
    return bDate - aDate;
  });
}

export function getProject(id) {
  return getProjects().find((project) => String(project.id) === String(id)) || null;
}

export function saveProject(project) {
  const projects = getProjects();
  const now = new Date().toISOString();

  if (project.id) {
    const index = projects.findIndex((item) => String(item.id) === String(project.id));
    if (index >= 0) {
      projects[index] = normalizeProject({ ...projects[index], ...project, updated_at: now });
      write(PROJECTS_KEY, projects);
      return projects[index];
    }
  }

  const created = normalizeProject({
    ...project,
    id: project.id || crypto.randomUUID(),
    created_at: now,
    updated_at: now,
  });
  projects.unshift(created);
  write(PROJECTS_KEY, projects);
  return created;
}

export function deleteProject(id) {
  write(
    PROJECTS_KEY,
    getProjects().filter((project) => String(project.id) !== String(id)),
  );
}

export function getInquiries() {
  return read(INQUIRIES_KEY, []).sort((a, b) => {
    const aDate = new Date(a.created_at || 0).getTime();
    const bDate = new Date(b.created_at || 0).getTime();
    return bDate - aDate;
  });
}

export function addInquiry(inquiry) {
  const created = {
    id: crypto.randomUUID(),
    full_name: inquiry.full_name || inquiry.name || '',
    name: inquiry.name || inquiry.full_name || '',
    email: inquiry.email || '',
    category: inquiry.category || '',
    message: inquiry.message || '',
    created_at: new Date().toISOString(),
  };
  const inquiries = getInquiries();
  inquiries.unshift(created);
  write(INQUIRIES_KEY, inquiries);
  return created;
}

export function deleteInquiry(id) {
  write(
    INQUIRIES_KEY,
    getInquiries().filter((inquiry) => String(inquiry.id) !== String(id)),
  );
}
