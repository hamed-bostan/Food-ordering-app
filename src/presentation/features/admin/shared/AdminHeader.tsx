import Link from "next/link";

export default function AdminHeader() {
  return (
    <div className="flex gap-6">
      <Link href="/manage/users">User management</Link>
      <Link href="/manage/testimonials">Testimonials management</Link>
      <Link href="/create/testimonials">Create testimonials</Link>
      <Link href="/manage/products">Products management</Link>
      <Link href="/create/products">Create products</Link>
      <Link href="/manage/orders">manage orders</Link>
    </div>
  );
}
