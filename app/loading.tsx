export default function Loading() {
  return (
    <div className="flex flex-col container mt-16">
      <h1 className="text-center text-3xl font-semibold">Carregando...</h1>
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-gray-900"></div>
      </div>
    </div>
  );
}