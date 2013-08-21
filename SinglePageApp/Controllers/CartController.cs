using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using SinglePageApp.Model;

namespace SinglePageApp.Controllers
{
    public class CartController : ApiController
    {
        //each user only has one cart at most

        private Cart GetUserCart()
        {
            return Storage.Data.Users.First(u => u.Id == SecurityContext.Current.UserId).Cart;
        }

        // GET api/Cart
        public CartView Get()
        {
            return new CartView(GetUserCart());
        }

        // POST api/Cart
        public Cart Post(CartView cart)
        {
            Cart userCart = GetUserCart();
            userCart.CartItems.Clear();

            foreach (CartItemView item in cart.Items)
            {
                userCart.CartItems.Add(item);
            }

            Storage.Save();
            return userCart;
        }

        // PUT api/Cart
        public void Put(CartView cart)
        {
            Post(cart);
        }

        // DELETE api/Cart
        public void Delete()
        {
            Cart userCart = GetUserCart();
            userCart.CartItems.Clear();
            Storage.Save();
        }
    }

    public class CartView : Cart
    {
        public CartView()
        {
        }

        public CartView(Cart cart)
        {
            CartItems = null;
            Items = cart.CartItems.Select(item => new CartItemView(item)).ToList();
        }

        public IList<CartItemView> Items { get; set; }
    }

    public class CartItemView : CartItem
    {
        public string Name { get; set; }
        public decimal UnitPrice { get; set; }

        public CartItemView()
        {
        }

        public CartItemView(CartItem item)
        {
            Quantity = item.Quantity;
            ProductId = item.ProductId;
            Product product = Storage.Data.Products.First(p => p.Id == ProductId);
            Name = product.Name;
            UnitPrice = product.Price;
        }
    }
}