import { query } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { getUser } from '@/app/user/[userId]/userActions';

export default async function UserEditPage({
  params,
}: {
  params: { userId: string };
}) {
  const user = await getUser(params.userId);
  async function editUser(formData: FormData) {
    'use server';
    const user_id: string = params.userId;
    const user_display_name = formData.get('userName');
    const user_email = formData.get('userEmail');
    await query(
      'UPDATE Users SET user_display_name = $1, user_email = $2 WHERE user_id = $3',
      [user_display_name, user_email, user_id]
    );
    revalidatePath(`/user/${user_id}/edit`);
  }

  async function redirectToUserProfile() {
    'use server';
    redirect(`/user/${params.userId}`);
  }

  return (
    <div>
      <div>{user?.user_display_name}</div>
      <div>
        <form className="flex flex-column gap-2" action={editUser}>
          <title>Name</title>
          <input
            className="text-gray-800"
            name="userName"
            type="text"
            defaultValue={user?.user_display_name}
          />
          <title>Email</title>
          <input
            className="text-gray-800"
            name="userEmail"
            type="text"
            defaultValue={user?.user_email}
          />
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            type="submit"
          >
            Submit
          </button>
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            formAction={redirectToUserProfile}
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}
