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
  'Matematika', 'Fisika', 'Astronomi', 'Kimia', 'Aktuaria'
];

const siths = [
  'Biologi', 'Mikrobiologi'
];

const sithr = [
  'Rekayasa Hayati', 'Rekayasa Pertanian', 'Rekayasa Kehutanan', 'Teknologi Pasca Panen'
]

const sf = [
  'Sains and Teknologi Farmasi', 'Farmasi Klinik dan Komunitas'
]

const fitb = [
  'Teknologi Geologi', 'Teknik Geodesi dan Geomatika', 'Meteorologi', 'Oseanografi'
]

const fttm = [
  'Teknik Pertambangan', 'Teknik Perminyakan', 'Teknik Geofisika', 'Teknik Metalurgi'
]

const fti = [
  'Teknik Pangan', 'Teknik Bioenergi dan Kemurgi', 'Teknik Fisika', 'Teknik Kimia', 'Teknik Industri', 'Manajemen Rekayasa Industri'
]

const stei = [
  'Teknik Elektro', 'Teknik Informatika', 'Teknik Tenaga Listrik', 'Teknik Telekomunikasi', 'Sistem dan Teknologi Informasi', 'Teknik Biomedis'
]

const ftmd = [
  'Teknik Mesin', 'Teknik Dirgantara', 'Teknik Material'
]

const ftsl = [
  'Teknik Sipil', 'Teknik Lingkungan', 'Teknik Kelautan', 'Teknik dan Pengelolaan Sumber Daya Air', 'Rekayasa Infrastruktur Lingkungan'
]

const sappk = [
  'Arsitektur', 'Perencanaan Wilayah dan Kota'
]

const fsrd = [
  'Seni Rupa', 'Kria', 'Desain Interior', 'Desain Komunikasi Visual', 'Desain Produk'
]

const sbm = [
  'Manajemen', 'Kewirausahaan'
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