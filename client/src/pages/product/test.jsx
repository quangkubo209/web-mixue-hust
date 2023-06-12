<div className="grid min-[1200px]:grid-cols-3 min-[1440px]:grid-cols-4 min-[1700px]:grid-cols-4  gap-4 mr-2 ml-2">
  <>
    {products.length > 0 ? (
      products.map((product, index) => (
        <div key={product.id} className="flex flex-col justify-between">
          <Card
            title={product.name}
            subTitle={product.category}
            footer={
              <div className="flex justify-between text-[14px]">
                <span className="flex items-center">
                  <div
                    className="text-red-500 cursor-pointer px-2 py-1 rounded border border-transparent hover:border-red-500 flex justify-center items-center"
                    onClick={() => {
                      setvisibleEditDialog(true);
                    }}
                  >
                    <i className="pi pi-pencil" />
                  </div>
                  <div
                    className="text-red-500 cursor-pointer px-2 py-1 rounded border border-transparent hover:border-red-500 flex justify-center items-center"
                    onClick={() => {
                      setProductId(product._id);
                      setProductName(product.title);
                      setVisibleDeleteDialog(true);
                    }}
                  >
                    <i className="pi pi-trash" />
                  </div>
                  <div
                    className="text-red-500 cursor-pointer px-2 py-1 rounded border border-transparent hover:border-red-500 flex justify-center items-center"
                    onClick={() => {
                      onProductSelect(product);
                    }}
                  >
                    <i className="pi pi-info-circle" />
                  </div>
                  <div
                    className="text-red-500 cursor-pointer px-2 py-1 rounded border border-transparent hover:border-red-500 flex justify-center items-center"
                    onClick={() => {
                      setVisibleEvaluation(true);
                    }}
                  >
                    <i className="pi pi-star" />
                  </div>
                </span>
              </div>
            }
          >
            <div className="flex justify-center">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-auto"
              />
            </div>
            <div className="mt-4">
              <div>
                <strong>Base price: </strong>
                <span class="text-s text-red-500">₫</span>
                {product.basePrice}
              </div>
            </div>
          </Card>
        </div>
      ))
    ) : (
      <div className="font-semibold text-3xl text-red">
        No products found
      </div>
    )}
  </>



</div>