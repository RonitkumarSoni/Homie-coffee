-- Create a table for public profiles (linked to auth.users)
create table public.profiles (
  id uuid not null references auth.users on delete cascade,
  email text,
  username text,
  full_name text,
  avatar_url text,
  membership_code text, -- The "Homie Membership" code
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  primary key (id)
);

-- Turn on Row Level Security
alter table public.profiles enable row level security;

-- Create policies
create policy "Public profiles are viewable by everyone."
  on profiles for select
  using ( true );

create policy "Users can insert their own profile."
  on profiles for insert
  with check ( auth.uid() = id );

create policy "Users can update own profile."
  on profiles for update
  using ( auth.uid() = id );

-- Create orders table
create table public.orders (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id), -- Nullable for guest checkout if needed
  customer_email text not null,
  total_amount numeric not null,
  status text default 'pending', -- pending, paid, shipped
  items jsonb not null, -- Store cart items snapshot
  shipping_address jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS for orders
alter table public.orders enable row level security;

create policy "Users can expand their own orders."
  on public.orders for select
  using ( auth.uid() = user_id );

create policy "Service role can manage all orders."
  on public.orders for all
  using ( true );
