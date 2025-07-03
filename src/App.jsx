import { useState, useEffect } from 'react';
import './App.css'; // Ensure this path is correct
import WelcomeModal from './components/WelcomeModal';
import Header from './components/Header';

const frameworks = [
  { name: 'Bootstrap', cdn: 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css' },
  { name: 'Tailwind', cdn: 'https://cdn.jsdelivr.net/npm/tailwindcss@3.4.1/dist/tailwind.min.css' },
  { name: 'Bulma', cdn: 'https://cdn.jsdelivr.net/npm/bulma@1.0.0/css/bulma.min.css' },
];

const componentSnippetsByCategory = {
  Bootstrap: {
    Buttons: [
      { name: 'Button', code: `<button class="btn btn-primary">Bootstrap Button</button>` },
    ],
    Cards: [
      { name: 'Card', code: `<div class="card" style="width: 18rem;">
  <div class="card-body">
    <h5 class="card-title">Card title</h5>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    <a href="#" class="btn btn-primary">Go somewhere</a>
  </div>
</div>` },
    ],
    Navigation: [
      { name: 'Navbar', code: `<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <a class="navbar-brand" href="#">Navbar</a>
  <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNav">
    <ul class="navbar-nav">
      <li class="nav-item active">
        <a class="nav-link" href="#">Home</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">Features</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">Pricing</a>
      </li>
    </ul>
  </div>
</nav>` },
      { name: 'Tabs', code: `<ul class="nav nav-tabs">
  <li class="nav-item">
    <a class="nav-link active" aria-current="page" href="#">Active</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" href="#">Link</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" href="#">Another Link</a>
  </li>
</ul>` },
      { name: 'Breadcrumb', code: `<nav aria-label="breadcrumb">
  <ol class="breadcrumb">
    <li class="breadcrumb-item"><a href="#">Home</a></li>
    <li class="breadcrumb-item"><a href="#">Library</a></li>
    <li class="breadcrumb-item active" aria-current="page">Data</li>
  </ol>
</nav>` },
      { name: 'Pagination', code: `<nav aria-label="Page navigation example">
  <ul class="pagination">
    <li class="page-item"><a class="page-link" href="#">Previous</a></li>
    <li class="page-item"><a class="page-link" href="#">1</a></li>
    <li class="page-item"><a class="page-link" href="#">2</a></li>
    <li class="page-item"><a class="page-link" href="#">3</a></li>
    <li class="page-item"><a class="page-link" href="#">Next</a></li>
  </ul>
</nav>` },
      { name: 'List Group', code: `<ul class="list-group">
  <li class="list-group-item active" aria-current="true">An active item</li>
  <li class="list-group-item">A second item</li>
  <li class="list-group-item">A third item</li>
</ul>` },
      { name: 'Dropdown', code: `<div class="dropdown">
  <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
    Dropdown button
  </button>
  <ul class="dropdown-menu">
    <li><a class="dropdown-item" href="#">Action</a></li>
    <li><a class="dropdown-item" href="#">Another action</a></li>
    <li><a class="dropdown-item" href="#">Something else here</a></li>
  </ul>
</div>` },
      { name: 'Footer', code: `<footer class="bg-light text-center text-lg-start mt-4">
  <div class="text-center p-3">© 2024 Bootstrap Footer</div>
</footer>` },
    ],
    DataDisplay: [
      { name: 'Table', code: `<table class="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">First</th>
      <th scope="col">Last</th>
      <th scope="col">Handle</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">1</th>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
    </tr>
    <tr>
      <th scope="row">2</th>
      <td>Jacob</td>
      <td>Thornton</td>
      <td>@fat</td>
    </tr>
  </tbody>
</table>` },
      { name: 'Progress Bar', code: `<div class="progress">
  <div class="progress-bar" role="progressbar" style="width: 50%;" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100">50%</div>
</div>` },
      { name: 'Avatar', code: `<img src="https://i.pravatar.cc/48" class="rounded-circle" alt="Avatar" />` },
      { name: 'Accordion', code: `<div class="accordion" id="accordionExample">
  <div class="accordion-item">
    <h2 class="accordion-header" id="headingOne">
      <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
        Accordion Item #1
      </button>
    </h2>
    <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
      <div class="accordion-body">
        <strong>This is the first item's accordion body.</strong>
      </div>
    </div>
  </div>
</div>` },
    ],
    Feedback: [
      { name: 'Alert', code: `<div class="alert alert-warning" role="alert">
  This is a Bootstrap alert—check it out!
</div>` },
      { name: 'Badge', code: `<span class="badge bg-success">Success</span>` },
    ],
    Forms: [
      { name: 'Form', code: `<form>
  <div class="mb-3">
    <label for="exampleInputEmail1" class="form-label">Email address</label>
    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
    <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div class="mb-3">
    <label for="exampleInputPassword1" class="form-label">Password</label>
    <input type="password" class="form-control" id="exampleInputPassword1">
  </div>
  <button type="submit" class="btn btn-primary">Submit</button>
</form>` },
    ],
    Misc: [
      { name: 'Modal', code: `<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Launch demo modal
</button>
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        ...
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>` },
    ],
  },
  Tailwind: {
    Buttons: [
      { name: 'Button', code: `<button class="px-6 py-2 bg-gradient-to-r from-blue-500 to-cyan-400 text-white font-semibold rounded-full shadow-lg hover:from-cyan-400 hover:to-blue-500 transition">Modern Tailwind Button</button>` },
    ],
    Cards: [
      { name: 'Card', code: `<div class="max-w-sm rounded-2xl overflow-hidden shadow-lg bg-white dark:bg-gray-800">
  <img class="w-full h-40 object-cover" src="https://source.unsplash.com/random/400x200" alt="Modern Card" />
  <div class="px-6 py-4">
    <div class="font-bold text-xl mb-2 text-gray-900 dark:text-white">Modern Card</div>
    <p class="text-gray-700 dark:text-gray-300 text-base">A beautiful card with image, shadow, and rounded corners.</p>
    <a href="#" class="inline-block mt-4 px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-400 text-white rounded-full shadow hover:from-cyan-400 hover:to-blue-500 transition">Go somewhere</a>
  </div>
</div>` },
    ],
    Navigation: [
      { name: 'Navbar', code: `<nav class="bg-gradient-to-r from-blue-600 to-cyan-500 p-4 rounded-2xl shadow-lg flex items-center justify-between">
  <div class="flex items-center gap-2">
    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg" width="32" alt="" />
    <span class="text-white font-bold text-xl">Modern Navbar</span>
  </div>
  <div class="space-x-4">
    <a href="#" class="text-white hover:text-cyan-100 font-semibold">Home</a>
    <a href="#" class="text-white hover:text-cyan-100 font-semibold">Features</a>
    <a href="#" class="text-white hover:text-cyan-100 font-semibold">Pricing</a>
  </div>
</nav>` },
    ],
    Feedback: [
      { name: 'Alert', code: `<div class="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4" role="alert">
  <p class="font-bold">Alert</p>
  <p>This is a Tailwind alert—check it out!</p>
</div>` },
      { name: 'Badge', code: `<span class="inline-block bg-green-200 text-green-800 text-xs px-2 py-1 rounded-full">Success</span>` },
    ],
    Forms: [
      { name: 'Form', code: `<form class="space-y-4">
  <div>
    <label class="block text-gray-700 dark:text-gray-200">Email address</label>
    <input type="email" class="mt-1 block w-full rounded border-gray-300 dark:bg-gray-900 dark:text-white" placeholder="you@example.com" />
  </div>
  <div>
    <label class="block text-gray-700 dark:text-gray-200">Password</label>
    <input type="password" class="mt-1 block w-full rounded border-gray-300 dark:bg-gray-900 dark:text-white" />
  </div>
  <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">Submit</button>
</form>` },
    ],
    Misc: [
      { name: 'Modal', code: `<div class="fixed z-10 inset-0 overflow-y-auto">
  <div class="flex items-center justify-center min-h-screen">
    <div class="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-lg max-w-md w-full">
      <h2 class="text-xl font-bold mb-4">Modal Title</h2>
      <p class="mb-4">This is a modal dialog.</p>
      <button class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">Close</button>
    </div>
  </div>
</div>` },
    ],
  },
  Bulma: {
    Buttons: [
      { name: 'Button', code: `<button class="button is-primary is-rounded is-large has-text-weight-semibold" style="box-shadow:0 2px 8px #38b6ff44;">Modern Bulma Button</button>` },
    ],
    Cards: [
      { name: 'Card', code: `<div class="card" style="width: 22rem; border-radius:1rem; box-shadow:0 4px 24px #38b6ff22;">
  <div class="card-image">
    <figure class="image is-4by3">
      <img src="https://source.unsplash.com/random/400x200" alt="Modern Card" style="border-radius:1rem 1rem 0 0;" />
    </figure>
  </div>
  <div class="card-content">
    <p class="title is-4">Modern Card</p>
    <p class="content">A beautiful card with image, shadow, and rounded corners.</p>
    <a href="#" class="button is-primary is-rounded">Go somewhere</a>
  </div>
</div>` },
    ],
    Navigation: [
      { name: 'Navbar', code: `<nav class="navbar is-spaced has-shadow" style="border-radius:1rem; background:linear-gradient(90deg,#4f8cff 0%,#38b6ff 100%)">
  <div class="navbar-brand">
    <a class="navbar-item" href="#">
      <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bulma/bulma-plain.svg" width="32" alt="" />
      <span class="has-text-weight-bold has-text-white ml-2">Modern Navbar</span>
    </a>
    <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false">
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </a>
  </div>
  <div class="navbar-menu">
    <div class="navbar-start">
      <a class="navbar-item has-text-white" href="#">Home</a>
      <a class="navbar-item has-text-white" href="#">Features</a>
      <a class="navbar-item has-text-white" href="#">Pricing</a>
    </div>
  </div>
</nav>` },
    ],
    Feedback: [
      { name: 'Alert', code: `<div class="notification is-warning">
  This is a Bulma alert—check it out!
</div>` },
      { name: 'Badge', code: `<span class="tag is-success">Success</span>` },
    ],
    Forms: [
      { name: 'Form', code: `<form>
  <div class="field">
    <label class="label">Email address</label>
    <div class="control">
      <input class="input" type="email" placeholder="you@example.com" />
    </div>
  </div>
  <div class="field">
    <label class="label">Password</label>
    <div class="control">
      <input class="input" type="password" />
    </div>
  </div>
  <div class="field">
    <div class="control">
      <button class="button is-primary" type="submit">Submit</button>
    </div>
  </div>
</form>` },
    ],
    Misc: [
      { name: 'Modal', code: `<div class="modal is-active">
  <div class="modal-background"></div>
  <div class="modal-content">
    <div class="box">
      <h2 class="title is-4">Modal Title</h2>
      <p>This is a modal dialog.</p>
      <button class="button is-primary">Close</button>
    </div>
  </div>
  <button class="modal-close is-large" aria-label="close"></button>
</div>` },
    ],
  },
}

const modernDefaultCSS = `
/* Modern UI polish for all frameworks */
body { background: #f6f8fa; }
.container, .card, .box, .navbar, .table, .modal-content, .accordion, .list-group, .notification, .alert, .progress, .badge, .tag {
  border-radius: 1rem !important;
  box-shadow: 0 4px 24px 0 rgba(34,34,59,0.08), 0 1.5px 4px 0 rgba(34,34,59,0.04);
}
.card, .box, .modal-content {
  background: #fff !important;
  padding: 1.5rem !important;
}
.btn, .button, .badge, .tag {
  border-radius: 999px !important;
  box-shadow: 0 2px 8px rgba(0,123,255,0.08);
  font-weight: 600;
  letter-spacing: 0.01em;
  transition: background 0.2s, color 0.2s, box-shadow 0.2s;
}
.btn-primary, .button.is-primary {
  background: linear-gradient(90deg, #4f8cff 0%, #38b6ff 100%) !important;
  color: #fff !important;
  border: none !important;
}
.btn-primary:hover, .button.is-primary:hover {
  background: linear-gradient(90deg, #38b6ff 0%, #4f8cff 100%) !important;
  color: #fff !important;
  box-shadow: 0 4px 16px rgba(79,140,255,0.15);
}
.navbar, .navbar-menu, .navbar-brand {
  border-radius: 1rem !important;
  background: #f8fafc !important;
  box-shadow: 0 2px 8px rgba(34,34,59,0.04);
}
.table {
  border-radius: 1rem !important;
  overflow: hidden;
  background: #fff !important;
}
.table th, .table td {
  padding: 1rem !important;
}
.progress-bar, .progress {
  border-radius: 999px !important;
}
.accordion-button, .nav-link, .navbar-item, .list-group-item, .breadcrumb-item, .dropdown-item {
  border-radius: 0.5rem !important;
  transition: background 0.2s, color 0.2s;
}
.accordion-button:focus, .nav-link:focus, .navbar-item:focus, .list-group-item:focus, .dropdown-item:focus {
  outline: 2px solid #4f8cff;
}
img.rounded-circle, .avatar {
  border-radius: 50% !important;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  border: 2px solid #4f8cff;
}
`;

const defaultHtml = `<div class="container">
  <h1>Hello, world!</h1>
  <p>This is a playground for CSS frameworks.</p>
</div>`;

const previewSandboxScript = `
<script>
  // Prevent all form submissions
  document.addEventListener('submit', function(e) { e.preventDefault(); }, true);
  // Prevent all link navigations
  document.addEventListener('click', function(e) {
    const t = e.target.closest('a');
    if (t && t.getAttribute('href') && t.getAttribute('href') !== '#') {
      e.preventDefault();
    }
  }, true);
  // Prevent all button default actions (like submit)
  document.addEventListener('click', function(e) {
    const t = e.target.closest('button');
    if (t && t.type === 'submit') {
      e.preventDefault();
    }
  }, true);
</script>
`;

function App() {
  const [selectedFramework, setSelectedFramework] = useState(frameworks[0]);
  const [code, setCode] = useState(defaultHtml);
  const [customCss, setCustomCss] = useState(modernDefaultCSS);
  const [copied, setCopied] = useState({});
  const [theme, setTheme] = useState('dark');
  const [debouncedPreview, setDebouncedPreview] = useState({ code: defaultHtml, css: '' });
  const [search, setSearch] = useState('');
  const [openCategories, setOpenCategories] = useState({});
  const [shareCopied, setShareCopied] = useState(false);
  const [customComponents, setCustomComponents] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('playground_custom_components') || '[]');
    } catch {
      return [];
    }
  });
  const [showAddCustom, setShowAddCustom] = useState(false);
  const [newCustomName, setNewCustomName] = useState('');
  const [newCustomCode, setNewCustomCode] = useState('');
  const [showWelcome, setShowWelcome] = useState(() => {
    try {
      return localStorage.getItem('playground_welcome_dismissed') !== 'true';
    } catch {
      return true;
    }
  });

  // Debounce the preview update
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedPreview({ code, css: customCss });
    }, 1000); // 1 second debounce
    return () => clearTimeout(handler);
  }, [code, customCss]);

  // On load, check for share params in URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const html = params.get('html');
    const css = params.get('css');
    const fw = params.get('fw');
    if (html || css || fw) {
      if (html) setCode(decodeURIComponent(atob(html)));
      if (css) setCustomCss(decodeURIComponent(atob(css)));
      if (fw) {
        const found = frameworks.find(f => f.name === fw);
        if (found) setSelectedFramework(found);
      }
    }
    // eslint-disable-next-line
  }, []);

  // Save custom components to localStorage
  useEffect(() => {
    localStorage.setItem('playground_custom_components', JSON.stringify(customComponents));
  }, [customComponents]);

  const handleExport = () => {
    const html = `<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n  <meta charset=\"UTF-8\" />\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />\n  <title>Exported Component</title>\n  <link rel=\"stylesheet\" href=\"${selectedFramework.cdn}\" />\n  <style>\n${customCss}\n  </style>\n</head>\n<body>\n${code}\n</body>\n</html>`;
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'component.html';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleInsertComponent = (snippet) => {
    setCode(code + '\n' + snippet);
  };

  const handleClearEditor = () => {
    setCode(defaultHtml);
  };

  const handleCopy = (category, name, code) => {
    navigator.clipboard.writeText(code);
    setCopied(prev => ({ ...prev, [`${category}-${name}`]: true }));
    setTimeout(() => {
      setCopied(prev => ({ ...prev, [`${category}-${name}`]: false }));
    }, 1200);
  };

  const handleToggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  // Add custom component handler
  const handleAddCustom = () => {
    if (!newCustomName.trim() || !newCustomCode.trim()) return;
    setCustomComponents([{ name: newCustomName.trim(), code: newCustomCode }, ...customComponents]);
    setShowAddCustom(false);
    setNewCustomName('');
    setNewCustomCode('');
  };

  // Delete custom component handler
  const handleDeleteCustom = (name) => {
    setCustomComponents(customComponents.filter(c => c.name !== name));
  };

  // Filtered component categories based on search
  const filteredCategories = (() => {
    let cats = Object.entries(componentSnippetsByCategory[selectedFramework.name])
      .map(([category, comps]) => {
        const filteredComps = comps.filter(comp => comp.name.toLowerCase().includes(search.toLowerCase()));
        return filteredComps.length > 0 ? [category, filteredComps] : null;
      })
      .filter(Boolean);
    // Add custom components if any
    const filteredCustom = customComponents.filter(comp => comp.name.toLowerCase().includes(search.toLowerCase()));
    if (filteredCustom.length > 0) {
      cats = [["Custom", filteredCustom], ...cats];
    }
    return cats;
  })();

  // Update the useEffect for openCategories:
  useEffect(() => {
    if (search) {
      setOpenCategories(Object.fromEntries(filteredCategories.map(([cat]) => [cat, true])));
    } else if (Object.keys(openCategories).length === 0) {
      setOpenCategories(Object.fromEntries(filteredCategories.map(([cat]) => [cat, false])));
    }
    // eslint-disable-next-line
  }, [search, selectedFramework.name]);

  const toggleCategory = (cat) => {
    setOpenCategories(prev => ({ ...prev, [cat]: !prev[cat] }));
  };

  // Share handler
  const handleShare = () => {
    const params = new URLSearchParams();
    params.set('html', btoa(encodeURIComponent(code)));
    params.set('css', btoa(encodeURIComponent(customCss)));
    params.set('fw', selectedFramework.name);
    const url = `${window.location.origin}${window.location.pathname}?${params.toString()}`;
    navigator.clipboard.writeText(url);
    setShareCopied(true);
    setTimeout(() => setShareCopied(false), 1200);
  };

  const handleDismissWelcome = () => {
    setShowWelcome(false);
    localStorage.setItem('playground_welcome_dismissed', 'true');
  };

  // Reset Playground handler
  const handleReset = () => {
    localStorage.removeItem('playground_html');
    localStorage.removeItem('playground_css');
    localStorage.removeItem('playground_framework');
    localStorage.removeItem('playground_custom_components');
    localStorage.removeItem('playground_welcome_dismissed');
    window.location.reload();
  };

  return (
    <>
      <WelcomeModal show={showWelcome} onDismiss={handleDismissWelcome} />
      <div className={`app-container ${theme}-theme`}>
        {/* Header section */}
        <Header theme={theme} handleToggleTheme={handleToggleTheme} onReset={handleReset} />

        {/* Main playground area (sidebar + editor/preview) */}
        <div className="playground-layout">
          {/* Sidebar */}
          <aside className="sidebar">
            <div>
              <h2>Framework</h2>
              <select
                value={selectedFramework.name}
                onChange={e => {
                  const fw = frameworks.find(f => f.name === e.target.value);
                  setSelectedFramework(fw);
                }}
              >
                {frameworks.map(fw => (
                  <option key={fw.name} value={fw.name}>{fw.name}</option>
                ))}
              </select>
              <div style={{ marginTop: '2rem' }}>
                <h2 style={{ fontSize: '1.1rem', color: 'var(--color-accent-blue)', marginBottom: '0.5rem' }}>Component Library</h2>
                <input
                  type="text"
                  placeholder="Search components..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.5rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--color-border)',
                    marginBottom: '1rem',
                    fontSize: '1rem',
                    background: 'var(--color-bg-primary)',
                    color: 'var(--color-text-primary)',
                  }}
                />
                <button onClick={() => setShowAddCustom(v => !v)} style={{ width: '100%', marginBottom: '1rem', background: 'var(--color-accent-blue)', color: '#fff', border: 'none', borderRadius: 'var(--radius-md)', padding: '0.6rem 0', fontWeight: 600, fontSize: '1rem', cursor: 'pointer' }}>+ Add Custom Component</button>
                {showAddCustom && (
                  <div style={{ marginBottom: '1rem', background: 'var(--color-surface-elevated)', borderRadius: 'var(--radius-md)', padding: '1rem' }}>
                    <input type="text" placeholder="Component Name" value={newCustomName} onChange={e => setNewCustomName(e.target.value)} style={{ width: '100%', marginBottom: '0.5rem', padding: '0.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', fontSize: '1rem' }} />
                    <textarea placeholder="Component HTML" value={newCustomCode} onChange={e => setNewCustomCode(e.target.value)} style={{ width: '100%', minHeight: '60px', marginBottom: '0.5rem', padding: '0.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', fontFamily: 'Fira Mono, Consolas, monospace', fontSize: '0.95rem' }} />
                    <button onClick={handleAddCustom} style={{ background: 'var(--color-accent-blue)', color: '#fff', border: 'none', borderRadius: 'var(--radius-md)', padding: '0.5rem 1.2rem', fontWeight: 600, fontSize: '1rem', cursor: 'pointer', marginRight: '0.5rem' }}>Add</button>
                    <button onClick={() => setShowAddCustom(false)} style={{ background: 'var(--color-bg-secondary)', color: 'var(--color-text-secondary)', border: 'none', borderRadius: 'var(--radius-md)', padding: '0.5rem 1.2rem', fontWeight: 600, fontSize: '1rem', cursor: 'pointer' }}>Cancel</button>
                  </div>
                )}
                {filteredCategories.map(([category, comps]) => (
                  <div key={category} style={{ marginBottom: '1.2rem' }}>
                    <div
                      style={{
                        fontWeight: 600,
                        color: 'var(--color-accent-blue)',
                        marginBottom: '0.3rem',
                        fontSize: '1rem',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        userSelect: 'none',
                      }}
                      onClick={() => toggleCategory(category)}
                    >
                      <span style={{
                        marginRight: '0.5rem',
                        fontSize: '1.1em',
                        color: 'var(--color-accent-blue)',
                        display: 'inline-block',
                        transition: 'transform 0.2s',
                        transform: openCategories[category] ? 'rotate(90deg)' : 'rotate(0deg)',
                      }}>▶</span>
                      {category}
                    </div>
                    {openCategories[category] && (
                      <ul style={{ listStyle: 'none', padding: 0 }}>
                        {comps.map((comp) => (
                          <li key={comp.name} style={{ marginBottom: '0.7rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <button
                              style={{
                                width: '100%',
                                background: 'var(--color-surface-elevated)',
                                color: 'var(--color-text-primary)',
                                border: '1px solid var(--color-border)',
                                borderRadius: 'var(--radius-md)',
                                padding: '0.5rem 0.7rem',
                                fontWeight: 500,
                                fontSize: '1rem',
                                cursor: 'pointer',
                                transition: 'background 0.2s, color 0.2s',
                                textAlign: 'left',
                                marginBottom: '0.2rem',
                              }}
                              onClick={() => handleInsertComponent(comp.code)}
                            >
                              + {comp.name}
                            </button>
                            <button
                              title="Copy code"
                              style={{
                                background: 'none',
                                border: 'none',
                                color: 'var(--color-accent-blue-light)',
                                cursor: 'pointer',
                                fontSize: '1.2em',
                                marginLeft: '0.2rem',
                                padding: 0,
                              }}
                              onClick={() => handleCopy(category, comp.name, comp.code)}
                            >
                              {copied[`${category}-${comp.name}`] ? '✔️' : '📋'}
                            </button>
                            {category === 'Custom' && (
                              <button
                                title="Delete"
                                onClick={() => handleDeleteCustom(comp.name)}
                                style={{
                                  background: 'none',
                                  border: 'none',
                                  color: '#e74c3c',
                                  cursor: 'pointer',
                                  fontSize: '1.2em',
                                  marginLeft: '0.2rem',
                                  padding: 0,
                                }}
                              >
                                🗑️
                              </button>
                            )}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div className="sidebar-footer">
              <p>CSS Framework Playground</p>
            </div>
          </aside>

          {/* Main content area */}
          <main className="main-content">
            <div className="editor-preview-container">
              <div className="editor-panel">
                <label htmlFor="code-editor">HTML Editor</label>
                <textarea
                  id="code-editor"
                  value={code}
                  onChange={e => setCode(e.target.value)}
                  spellCheck={false}
                />
                <label htmlFor="css-editor" style={{marginTop: '1rem'}}>Custom CSS</label>
                <textarea
                  id="css-editor"
                  value={customCss}
                  onChange={e => setCustomCss(e.target.value)}
                  spellCheck={false}
                  placeholder="/* Write your custom CSS here */"
                  style={{ minHeight: '80px', fontFamily: 'Fira Mono, Consolas, monospace', marginBottom: '0.5rem' }}
                />
                <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
                  <button className="export-btn" onClick={handleExport}>Export HTML</button>
                  <button className="export-btn" style={{ background: 'linear-gradient(90deg, #e74c3c 0%, #c0392b 100%)' }} onClick={handleClearEditor}>Clear Editor</button>
                  <button className="export-btn" onClick={handleShare} style={{ background: 'linear-gradient(90deg, #00c6ff 0%, #0072ff 100%)' }}>{shareCopied ? 'Link Copied!' : 'Share'}</button>
                </div>
              </div>
              <div className="preview-panel">
                <label>Live Preview</label>
                <iframe
                  title="Live Preview"
                  srcDoc={`<html><head><link rel='stylesheet' href='${selectedFramework.cdn}' /><style>${debouncedPreview.css}</style></head><body>${debouncedPreview.code}${previewSandboxScript}</body></html>`}
                  sandbox="allow-scripts allow-same-origin"
                  style={{ width: '100%', height: '100%', border: 'none', background: '#fff', borderRadius: '8px', flex: 1 }}
                />
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

export default App;