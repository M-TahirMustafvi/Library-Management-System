export const authFormStyles = {
  container: 'flex items-center justify-center min-h-screen bg-gray-900',
  form: 'flex flex-col max-w-sm w-full p-6 bg-gray-800 rounded-2xl shadow-lg space-y-6',
  title: 'text-2xl font-bold text-white text-center',
  inputGroup: 'flex flex-col',
  label: 'mb-1 text-sm font-medium text-gray-300',
  input: 'px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500',
  button: 'w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition-colors',
  warning: 'mt-1 text-sm text-red-500 font-medium'
  };

export const DashboardStyles = {
  container: 'flex flex-col items-center min-h-screen bg-gray-900 px-4 py-10',
  title: 'text-3xl font-bold text-white mb-6 text-center',
  cardsWrapper: 'w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6',
  card: 'bg-gray-800 rounded-lg shadow-lg p-6 w-full',
  cardTitle: 'text-xl font-semibold text-white mb-2',
  cardContent: 'text-gray-300',
};

export const BooksStyles = {
  tableWrapper: "overflow-x-auto p-4 rounded-lg",
  table: "min-w-full bg-gray-800 shadow-md rounded-lg overflow-hidden",
  thead: "bg-gray-700 text-white",
  th: "text-left py-2 px-4",
  tr: "border-b hover:bg-gray-600 cursor-pointer",
  td: "py-2 px-2",
  input: "px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white",
  button: "bg-blue-600 hover:bg-blue-700 ml-5 text-white font-semibold py-2 px-4 rounded-md transition-colors cursor-pointer",
  searchWrapper: "flex items-center justify-between mb-4"
};

export const ModalStyles = {
  container: "fixed inset-0 backdrop-blur-md backdrop-brightness-50 flex justify-center items-center z-50",
  modal: "w-1/2 md:w-100 bg-gray-800 rounded",
  title: "text-2xl font-bold text-white mb-4 text-center",

};