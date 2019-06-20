export const fakultas = new Map([
  ['160' , 'FMIPA'],
  ['161' , 'SITH-S'],
  ['198' , 'SITH-R'],
  ['162' , 'SF'],
  ['163' , 'FITB'],
  ['164' , 'FTTM'],
  ['165' , 'STEI'],
  ['166', 'FTSL'],
  ['167' , 'FTI'],
  ['168' , 'FSRD'],
  ['169' , 'FTMD'],
  ['190' , 'SBM'],
  ['199' , 'SAPPK']
]);

const fmipa = [
  'Matematika', 'Fisika', 'Astronomi', 'Kimia', 'Aktuaria', 'Tahap Tahun Pertama FMIPA'
];

const siths = [
  'Biologi', 'Mikrobiologi', 'Tahap Tahun Pertama SITH-S'
];

const sithr = [
  'Rekayasa Hayati', 'Rekayasa Pertanian', 'Rekayasa Kehutanan', 'Teknologi Pasca Panen', 'Tahap Tahun Pertama SITH-R'
]

const sf = [
  'Sains dan Teknologi Farmasi', 'Farmasi Klinik dan Komunitas', 'Tahap Tahun Pertama SF'
]

const fitb = [
  'Teknik Geologi', 'Teknik Geodesi dan Geomatika', 'Meteorologi', 'Oseanografi', 'Tahap Tahun Pertama FITB'
]

const fttm = [
  'Teknik Pertambangan', 'Teknik Perminyakan', 'Teknik Geofisika', 'Teknik Metalurgi', 'Tahap Tahun Pertama FTTM'
]

const fti = [
  'Teknik Pangan', 'Teknik Bioenergi dan Kemurgi', 'Teknik Fisika', 'Teknik Kimia', 'Teknik Industri', 'Manajemen Rekayasa Industri', 'Tahap Tahun Pertama FTI'
]

const stei = [
  'Teknik Elektro', 'Teknik Informatika', 'Teknik Tenaga Listrik', 'Teknik Telekomunikasi', 'Sistem dan Teknologi Informasi', 'Teknik Biomedis', 'Tahap Tahun Pertama STEI'
]

const ftmd = [
  'Teknik Mesin', 'Aeronautika dan Astronotika', 'Teknik Material', 'Tahap Tahun Pertama FTMD'
]

const ftsl = [
  'Teknik Sipil', 'Teknik Lingkungan', 'Teknik Kelautan', 'Teknik dan Pengelolaan Sumber Daya Air', 'Rekayasa Infrastruktur Lingkungan', 'Tahap Tahun Pertama FTSL'
]

const sappk = [
  'Arsitektur', 'Perencanaan Wilayah dan Kota', 'Tahap Tahun Pertama SAPPK'
]

const fsrd = [
  'Seni Rupa', 'Kriya', 'Desain Interior', 'Desain Komunikasi Visual', 'Desain Produk', 'Tahap Tahun Pertama FSRD'
]

const sbm = [
  'Manajemen', 'Kewirausahaan', 'Tahap Tahun Pertama SBM'
]

export const prodi = new Map();
prodi.set('160', fmipa);
prodi.set('161', siths);
prodi.set('198', sithr);
prodi.set('162', sf);
prodi.set('163', fitb);
prodi.set('164', fttm);
prodi.set('165', stei);
prodi.set('166', ftsl);
prodi.set('167', fti);
prodi.set('168', fsrd);
prodi.set('169', ftmd);
prodi.set('190', sbm);
prodi.set('199', sappk);