-- ============================================================
--  财富体质测试 · Supabase 数据库结构
--  用法：Supabase 控制台 → SQL Editor → 粘贴全部内容 → Run
--  执行一次即可。之后密码管理可在 Supabase 后台 Table Editor 直接操作。
-- ============================================================

-- 1) 密码表：每个测试密码 + 剩余可用次数
create table if not exists public.passwords (
  password text primary key,
  uses     integer not null default 3
);

-- 2) 管理员密钥（不对外暴露，anon 没有 select 权限）
create table if not exists public.admin_secret (
  id        integer primary key default 1,
  admin_key text not null
);
insert into public.admin_secret (id, admin_key) values (1, 'admin888')
on conflict (id) do nothing;

-- 3) 开启行级安全，但不给 anon/authenticated 任何直接访问策略
--    （外部只能通过这些函数间接访问，且函数内部做了鉴权）
alter table public.passwords enable row level security;
alter table public.admin_secret enable row level security;

-- 4) 解锁：原子扣减 1 次，返回剩余次数；无效或已用完返回 null
create or replace function public.consume_password(p text)
returns integer
language plpgsql
security definer
set search_path = public
as $$
declare
  new_uses integer;
begin
  update public.passwords set uses = uses - 1
   where password = p and uses > 0
   returning uses into new_uses;
  return new_uses;
end;
$$;

-- 5) 管理员鉴权：校验管理员密码是否正确
create or replace function public.admin_auth(k text)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
begin
  return exists (select 1 from public.admin_secret where admin_key = k);
end;
$$;

-- 6) 列出全部密码（先鉴权）
create or replace function public.admin_list(k text)
returns setof public.passwords
language plpgsql
security definer
set search_path = public
as $$
begin
  if not public.admin_auth(k) then return; end if;
  return query select * from public.passwords order by password;
end;
$$;

-- 7) 添加 / 更新密码（先鉴权）
create or replace function public.admin_add(k text, p text, u integer)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if not public.admin_auth(k) then return; end if;
  insert into public.passwords (password, uses) values (p, u)
  on conflict (password) do update set uses = u;
end;
$$;

-- 8) 删除密码（先鉴权）
create or replace function public.admin_del(k text, p text)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if not public.admin_auth(k) then return; end if;
  delete from public.passwords where password = p;
end;
$$;

-- 9) 重置为 3 次（先鉴权）
create or replace function public.admin_reset(k text, p text)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if not public.admin_auth(k) then return; end if;
  update public.passwords set uses = 3 where password = p;
end;
$$;

-- 10) 授权 anon 角色调用这些函数（前端用 anon key 调用）
grant execute on function public.consume_password(text) to anon, authenticated;
grant execute on function public.admin_auth(text) to anon, authenticated;
grant execute on function public.admin_list(text) to anon, authenticated;
grant execute on function public.admin_add(text, text, integer) to anon, authenticated;
grant execute on function public.admin_del(text, text) to anon, authenticated;
grant execute on function public.admin_reset(text, text) to anon, authenticated;

-- 11) 种子数据：把你现有的测试密码带过来（按需增删）
insert into public.passwords (password, uses) values
  ('abcd1234', 3),
  ('yt1258',   3),
  ('afgewe45', 2)
on conflict (password) do nothing;
