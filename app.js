const state = {
  currentCity: null,
  currentData: null,
  unit: 'celsius',
  theme: localStorage.getItem('theme') || 'dark',
  hourlyOffset: 0,
};

const DOM = {
  background: document.getElementById('background'),
  gradientSphere: document.getElementById('gradientSphere'),
  particles: document.getElementById('particles'),
  searchInput: document.getElementById('searchInput'),
  searchBtn: document.getElementById('searchBtn'),
  suggestions: document.getElementById('suggestions'),
  themeToggle: document.getElementById('themeToggle'),
  geoBtn: document.getElementById('geoBtn'),
  loadingOverlay: document.getElementById('loadingOverlay'),
  errorMessage: document.getElementById('errorMessage'),
  errorText: document.getElementById('errorText'),
  retryBtn: document.getElementById('retryBtn'),
  currentWeather: document.getElementById('currentWeather'),
  cityName: document.getElementById('cityName'),
  dateTime: document.getElementById('dateTime'),
  temperature: document.getElementById('temperature'),
  weatherIcon: document.getElementById('weatherIcon'),
  conditionText: document.getElementById('conditionText'),
  feelsLike: document.getElementById('feelsLike'),
  humidity: document.getElementById('humidity'),
  windSpeed: document.getElementById('windSpeed'),
  windDir: document.getElementById('windDir'),
  pressure: document.getElementById('pressure'),
  visibility: document.getElementById('visibility'),
  uvIndex: document.getElementById('uvIndex'),
  sunrise: document.getElementById('sunrise'),
  sunset: document.getElementById('sunset'),
  hourlySection: document.getElementById('hourlySection'),
  hourlyScroll: document.getElementById('hourlyScroll'),
  hourlyPrev: document.getElementById('hourlyPrev'),
  hourlyNext: document.getElementById('hourlyNext'),
  dailySection: document.getElementById('dailySection'),
  dailyList: document.getElementById('dailyList'),
};

const WMO_CODES = {
  0: { text: 'Açık', icon: 'day.svg' },
  1: { text: 'Az Bulutlu', icon: 'cloudy-day.svg' },
  2: { text: 'Parçalı Bulutlu', icon: 'cloudy.svg' },
  3: { text: 'Kapalı', icon: 'cloudy.svg' },
  45: { text: 'Sisli', icon: 'fog.svg' },
  48: { text: 'Sisli', icon: 'fog.svg' },
  51: { text: 'Hafif Çiseli', icon: 'rainy.svg' },
  53: { text: 'Çiseli', icon: 'rainy.svg' },
  55: { text: 'Kuvvetli Çiseli', icon: 'rainy.svg' },
  56: { text: 'Hafif Donan Çiseli', icon: 'snowy.svg' },
  57: { text: 'Donan Çiseli', icon: 'snowy.svg' },
  61: { text: 'Hafif Yağmurlu', icon: 'rainy.svg' },
  63: { text: 'Yağmurlu', icon: 'rainy.svg' },
  65: { text: 'Kuvvetli Yağmurlu', icon: 'rainy.svg' },
  66: { text: 'Hafif Donan Yağmurlu', icon: 'snowy.svg' },
  67: { text: 'Donan Yağmurlu', icon: 'snowy.svg' },
  71: { text: 'Hafif Karlı', icon: 'snowy.svg' },
  73: { text: 'Karlı', icon: 'snowy.svg' },
  75: { text: 'Kuvvetli Karlı', icon: 'snowy.svg' },
  77: { text: 'Kar Taneli', icon: 'snowy.svg' },
  80: { text: 'Hafif Sağanak', icon: 'rainy.svg' },
  81: { text: 'Sağanak Yağmurlu', icon: 'rainy.svg' },
  82: { text: 'Kuvvetli Sağanak', icon: 'rainy.svg' },
  85: { text: 'Hafif Kar Sağanağı', icon: 'snowy.svg' },
  86: { text: 'Kuvvetli Kar Sağanağı', icon: 'snowy.svg' },
  95: { text: 'Gök Gürültülü', icon: 'thunder.svg' },
  96: { text: 'Gök Gürültülü Dolu', icon: 'thunder.svg' },
  99: { text: 'Gök Gürültülü Dolu', icon: 'thunder.svg' },
};

const ICON_BASE = 'https://openweathermap.org/img/wn';

const WMO_ICON_MAP = {
  0: '01d',
  1: '02d',
  2: '03d',
  3: '04d',
  45: '50d',
  48: '50d',
  51: '09d',
  53: '09d',
  55: '09d',
  56: '13d',
  57: '13d',
  61: '10d',
  63: '10d',
  65: '10d',
  66: '13d',
  67: '13d',
  71: '13d',
  73: '13d',
  75: '13d',
  77: '13d',
  80: '09d',
  81: '09d',
  82: '09d',
  85: '13d',
  86: '13d',
  95: '11d',
  96: '11d',
  99: '11d',
};

const WMO_COLORS = {
  0: ['#6c5ce7', '#fd79a8'],
  1: ['#6c5ce7', '#74b9ff'],
  2: ['#636e72', '#b2bec3'],
  3: ['#636e72', '#b2bec3'],
  45: ['#b2bec3', '#dfe6e9'],
  48: ['#b2bec3', '#dfe6e9'],
  51: ['#74b9ff', '#0984e3'],
  53: ['#74b9ff', '#0984e3'],
  55: ['#0984e3', '#0652DD'],
  61: ['#74b9ff', '#0984e3'],
  63: ['#0984e3', '#0652DD'],
  65: ['#0652DD', '#1B1464'],
  71: ['#dfe6e9', '#b2bec3'],
  73: ['#dfe6e9', '#b2bec3'],
  75: ['#dfe6e9', '#b2bec3'],
  80: ['#74b9ff', '#0984e3'],
  81: ['#0984e3', '#0652DD'],
  82: ['#0652DD', '#1B1464'],
  85: ['#dfe6e9', '#b2bec3'],
  86: ['#dfe6e9', '#b2bec3'],
  95: ['#6c5ce7', '#2d3436'],
  96: ['#6c5ce7', '#2d3436'],
  99: ['#6c5ce7', '#2d3436'],
};

function initParticles() {
  DOM.particles.innerHTML = '';
  const count = Math.min(40, Math.floor(window.innerWidth / 20));
  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = 1.5 + Math.random() * 3;
    p.style.width = size + 'px';
    p.style.height = size + 'px';
    p.style.left = Math.random() * 100 + '%';
    p.style.animationDuration = 15 + Math.random() * 30 + 's';
    p.style.animationDelay = Math.random() * 20 + 's';
    p.style.opacity = 0.1 + Math.random() * 0.3;
    DOM.particles.appendChild(p);
  }
}

function setWeatherColors(code) {
  const colors = WMO_COLORS[code] || ['#6c5ce7', '#fd79a8'];
  DOM.gradientSphere.style.background = `radial-gradient(circle, ${colors[0]}22, transparent 70%)`;
  const afterEl = DOM.gradientSphere.querySelector('::after') || DOM.gradientSphere;
  DOM.gradientSphere.style.setProperty('--after-color', colors[1]);
}

function updateTheme() {
  const isDark = state.theme === 'dark';
  document.documentElement.setAttribute('data-theme', state.theme);
  DOM.themeToggle.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
  localStorage.setItem('theme', state.theme);
}

function toggleTheme() {
  state.theme = state.theme === 'dark' ? 'light' : 'dark';
  updateTheme();
}

function getWMOInfo(code) {
  return WMO_CODES[code] || { text: 'Bilinmiyor', icon: 'cloudy.svg' };
}

function getWMOIcon(code) {
  return `${ICON_BASE}/${WMO_ICON_MAP[code] || '01d'}@2x.png`;
}

function formatTime(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });
}

function formatHour(timeStr) {
  const d = new Date(timeStr);
  const now = new Date();
  const isToday = d.toDateString() === now.toDateString();
  if (isToday) {
    return d.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });
  }
  return d.toLocaleDateString('tr-TR', { weekday: 'short', hour: '2-digit' });
}

function formatDay(dateStr) {
  const d = new Date(dateStr);
  const now = new Date();
  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);

  if (d.toDateString() === now.toDateString()) return 'Bugün';
  if (d.toDateString() === tomorrow.toDateString()) return 'Yarın';
  return d.toLocaleDateString('tr-TR', { weekday: 'long' });
}

function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long' });
}

function getWindDirection(deg) {
  const dirs = ['K', 'KKD', 'KD', 'DKD', 'D', 'DGD', 'GD', 'GGD', 'G', 'GGB', 'GB', 'BGB', 'B', 'BKB', 'KB', 'KKB'];
  const index = Math.round(deg / 22.5) % 16;
  return dirs[index];
}

function getUVLevel(index) {
  if (index <= 2) return 'Düşük';
  if (index <= 5) return 'Orta';
  if (index <= 7) return 'Yüksek';
  if (index <= 10) return 'Çok Yüksek';
  return 'Aşırı';
}

function showLoading() {
  DOM.currentWeather.classList.remove('active');
  DOM.hourlySection.classList.remove('active');
  DOM.dailySection.classList.remove('active');
  DOM.errorMessage.classList.remove('active');
  DOM.loadingOverlay.classList.add('active');
}

function hideLoading() {
  DOM.loadingOverlay.classList.remove('active');
}

function showError(msg) {
  hideLoading();
  DOM.currentWeather.classList.remove('active');
  DOM.hourlySection.classList.remove('active');
  DOM.dailySection.classList.remove('active');
  DOM.errorText.textContent = msg || 'Bir hata oluştu. Lütfen tekrar deneyin.';
  DOM.errorMessage.classList.add('active');
}

// ===== API =====

async function geocode(city) {
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=5&language=tr&format=json`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Geocoding API hatası');
  const data = await res.json();
  return data.results || [];
}

async function fetchWeather(lat, lon) {
  const params = new URLSearchParams({
    latitude: lat,
    longitude: lon,
    current: 'temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m,wind_direction_10m,pressure_msl,visibility,uv_index',
    hourly: 'temperature_2m,weather_code,precipitation_probability,wind_speed_10m',
    daily: 'temperature_2m_max,temperature_2m_min,weather_code,precipitation_sum,sunrise,sunset,uv_index_max,wind_speed_10m_max',
    timezone: 'auto',
    forecast_days: 8,
  });

  const res = await fetch(`https://api.open-meteo.com/v1/forecast?${params}`);
  if (!res.ok) throw new Error('Weather API hatası');
  return res.json();
}

// ===== RENDER =====

function renderCurrentWeather(data, cityName) {
  const c = data.current;
  const daily = data.daily;
  const code = c.weather_code;

  DOM.cityName.innerHTML = `<i class="fas fa-map-pin"></i> ${cityName}`;

  const now = new Date();
  DOM.dateTime.textContent = now.toLocaleDateString('tr-TR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  DOM.temperature.textContent = Math.round(c.temperature_2m);
  DOM.weatherIcon.src = getWMOIcon(code);
  DOM.weatherIcon.alt = getWMOInfo(code).text;
  DOM.conditionText.textContent = getWMOInfo(code).text;
  DOM.feelsLike.textContent = Math.round(c.apparent_temperature);

  DOM.humidity.textContent = `${c.relative_humidity_2m}%`;
  DOM.windSpeed.textContent = `${Math.round(c.wind_speed_10m)} km/s`;
  DOM.windDir.textContent = getWindDirection(c.wind_direction_10m);
  DOM.pressure.textContent = `${Math.round(c.pressure_msl)} hPa`;
  DOM.visibility.textContent = `${(c.visibility / 1000).toFixed(1)} km`;
  DOM.uvIndex.textContent = `${c.uv_index} (${getUVLevel(c.uv_index)})`;

  DOM.sunrise.textContent = formatTime(daily.sunrise[0]);
  DOM.sunset.textContent = formatTime(daily.sunset[0]);

  setWeatherColors(code);
  DOM.currentWeather.classList.add('active');
}

function renderHourly(data) {
  const hourly = data.hourly;
  const now = new Date();
  const currentHour = now.getHours();
  const currentIndex = hourly.time.findIndex(t => {
    const h = new Date(t).getHours();
    return h >= currentHour && new Date(t).toDateString() === now.toDateString();
  });

  const start = Math.max(0, currentIndex >= 0 ? currentIndex : 0);
  const items = hourly.time.slice(start, start + 24);

  DOM.hourlyScroll.innerHTML = items.map((time, i) => {
    const idx = start + i;
    const code = hourly.weather_code[idx];
    const temp = Math.round(hourly.temperature_2m[idx]);
    const precip = hourly.precipitation_probability[idx];
    const info = getWMOInfo(code);
    const icon = getWMOIcon(code);
    return `
      <div class="hourly-item" style="animation-delay: ${i * 0.03}s">
        <div class="hourly-time">${formatHour(time)}</div>
        <img class="hourly-icon" src="${icon}" alt="${info.text}" loading="lazy">
        <div class="hourly-temp">${temp}°</div>
        ${precip != null ? `<div class="hourly-precip"><i class="fas fa-droplet"></i> ${precip}%</div>` : ''}
      </div>
    `;
  }).join('');

  DOM.hourlySection.classList.add('active');
}

function renderDaily(data) {
  const daily = data.daily;
  const n = Math.min(daily.time.length, 7);

  DOM.dailyList.innerHTML = Array.from({ length: n }, (_, i) => {
    const code = daily.weather_code[i];
    const max = Math.round(daily.temperature_2m_max[i]);
    const min = Math.round(daily.temperature_2m_min[i]);
    const precip = daily.precipitation_sum[i];
    const info = getWMOInfo(code);
    const icon = getWMOIcon(code);
    return `
      <div class="daily-item" style="animation-delay: ${i * 0.05}s">
        <div>
          <div class="daily-day">${formatDay(daily.time[i])}</div>
          <span class="daily-date">${formatDate(daily.time[i])}</span>
        </div>
        <div class="daily-middle">
          <img class="daily-icon" src="${icon}" alt="${info.text}" loading="lazy">
          <span class="daily-cond">${info.text}</span>
        </div>
        <div class="daily-temps">
          <span class="temp-max">${max}°</span>
          <span class="temp-sep">/</span>
          <span class="temp-min">${min}°</span>
        </div>
        ${precip > 0 ? `<div class="daily-precip"><i class="fas fa-droplet"></i> ${Math.round(precip)} mm</div>` : ''}
      </div>
    `;
  }).join('');

  DOM.dailySection.classList.add('active');
}

async function loadWeather(cityName) {
  showLoading();

  try {
    const results = await geocode(cityName);
    if (!results || results.length === 0) {
      showError('Şehir bulunamadı. Lütfen farklı bir isim deneyin.');
      return;
    }

    const loc = results[0];
    const data = await fetchWeather(loc.latitude, loc.longitude);

    const displayName = [loc.name, loc.admin1, loc.country].filter(Boolean).join(', ');
    state.currentCity = displayName;
    state.currentData = data;

    renderCurrentWeather(data, displayName);
    renderHourly(data);
    renderDaily(data);
    hideLoading();
  } catch (err) {
    console.error(err);
    showError('Hava durumu alınamadı. Lütfen internet bağlantınızı kontrol edin.');
  }
}

// ===== GEO LOCATION =====

function getGeoLocation() {
  if (!navigator.geolocation) {
    showError('Tarayıcınız konum paylaşımını desteklemiyor.');
    return;
  }

  showLoading();
  navigator.geolocation.getCurrentPosition(
    async (pos) => {
      try {
        const { latitude, longitude } = pos.coords;
        const data = await fetchWeather(latitude, longitude);

        const res = await fetch(
          `https://geocoding-api.open-meteo.com/v1/reverse?latitude=${latitude}&longitude=${longitude}&language=tr&format=json`
        );
        const geoData = await res.json();
        const loc = geoData.results?.[0];
        const displayName = loc
          ? [loc.name, loc.admin1, loc.country].filter(Boolean).join(', ')
          : `${latitude.toFixed(2)}, ${longitude.toFixed(2)}`;

        state.currentCity = displayName;
        state.currentData = data;

        renderCurrentWeather(data, displayName);
        renderHourly(data);
        renderDaily(data);
        hideLoading();
      } catch (err) {
        showError('Konum bilgisi alınamadı.');
      }
    },
    () => {
      showError('Konum paylaşımı reddedildi. Lütfen şehir adı girin.');
    },
    { enableHighAccuracy: true, timeout: 10000 }
  );
}

// ===== SUGGESTIONS =====

let suggestionTimer = null;

function showSuggestions(items) {
  DOM.suggestions.innerHTML = items.map(item => {
    const name = [item.name, item.admin1].filter(Boolean).join(', ');
    const country = item.country || '';
    return `
      <div class="suggestion-item" data-lat="${item.latitude}" data-lon="${item.longitude}" data-name="${item.name}">
        <i class="fas fa-location-dot"></i>
        <span>${name}</span>
        <span class="country">${country}</span>
      </div>
    `;
  }).join('');
  DOM.suggestions.classList.add('active');
}

function hideSuggestions() {
  DOM.suggestions.classList.remove('active');
}

async function fetchSuggestions(query) {
  if (query.length < 2) {
    hideSuggestions();
    return;
  }

  try {
    const results = await geocode(query);
    if (results && results.length > 0) {
      showSuggestions(results.slice(0, 5));
    } else {
      hideSuggestions();
    }
  } catch {
    hideSuggestions();
  }
}

function onSuggestionClick(e) {
  const item = e.target.closest('.suggestion-item');
  if (!item) return;
  hideSuggestions();
  const name = item.dataset.name;
  DOM.searchInput.value = name;
  loadWeather(name);
}

// ===== SCROLL =====

DOM.hourlyPrev.addEventListener('click', () => {
  DOM.hourlyScroll.scrollBy({ left: -300, behavior: 'smooth' });
});

DOM.hourlyNext.addEventListener('click', () => {
  DOM.hourlyScroll.scrollBy({ left: 300, behavior: 'smooth' });
});

// ===== EVENTS =====

DOM.searchInput.addEventListener('input', (e) => {
  clearTimeout(suggestionTimer);
  const val = e.target.value.trim();
  if (val.length < 2) {
    hideSuggestions();
    return;
  }
  suggestionTimer = setTimeout(() => fetchSuggestions(val), 300);
});

DOM.searchInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    hideSuggestions();
    const val = DOM.searchInput.value.trim();
    if (val) loadWeather(val);
  }
  if (e.key === 'Escape') hideSuggestions();
});

DOM.searchBtn.addEventListener('click', () => {
  hideSuggestions();
  const val = DOM.searchInput.value.trim();
  if (val) loadWeather(val);
});

DOM.suggestions.addEventListener('click', onSuggestionClick);

DOM.themeToggle.addEventListener('click', toggleTheme);

DOM.geoBtn.addEventListener('click', getGeoLocation);

DOM.retryBtn.addEventListener('click', () => {
  if (state.currentCity) {
    loadWeather(state.currentCity.split(',')[0]);
  } else {
    loadWeather('İstanbul');
  }
});

document.addEventListener('click', (e) => {
  if (!e.target.closest('.search-container')) hideSuggestions();
});

// ===== INIT =====

initParticles();
updateTheme();
loadWeather('İstanbul');

window.addEventListener('resize', initParticles);
