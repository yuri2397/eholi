<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // \App\Models\User::factory(10)->create();

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);

        $roles = [
            'King' => [
                'Create School', 'Remove School', 'Show School', 'Update School',
                'Create Professor', 'Remove Professor', 'Show Professor', 'Update Professor',
                'Create Student', 'Remove Student', 'Show Student', 'Update Student',
                'Create Parent', 'Remove Parent', 'Show Parent', 'Update Parent',
                'Create Personel', 'Remove Personel', 'Show Personel', 'Update Personel',
                'Create Others', 'Remove Others', 'Show Others', 'Update Others',
                'Create Admin', 'Remove Admin', 'Show Admin', 'Update Admin',
                'Create Super Admin', 'Remove Super Admin', 'Show Super Admin', 'Update Super Admin',
                'Create School Year', 'Remove School Year', 'Show School Year', 'Update School Year',
                'Create Course', 'Remove Course', 'Show Course', 'Update Course',
                'Create Note', 'Remove Note', 'Show Note', 'Update Note',
                'Create Contract', 'Remove Contract', 'Show Contract', 'Update Contract',
                'Create Semester', 'Remove Semester', 'Show Semester', 'Update Semester',
                'Show Room',
                'Create Level', 'Remove Level', 'Show Level', 'Update Level',
                'Show Level Class'


            ],
            'Super Admin' => [
                'Create Professor', 'Remove Professor', 'Show Professor', 'Update Professor',
                'Create Student', 'Remove Student', 'Show Student', 'Update Student',
                'Create Parent', 'Remove Parent', 'Show Parent', 'Update Parent',
                'Create Personel', 'Remove Personel', 'Show Personel', 'Update Personel',
                'Create Others', 'Remove Others', 'Show Others', 'Update Others',
                'Create Admin', 'Remove Admin', 'Show Admin', 'Update Admin',
                'Create Super Admin',
                'Create School Year', 'Update School Year',
                'Create Course', 'Remove Course', 'Show Course', 'Update Course',
                'Create Note', 'Remove Note', 'Show Note', 'Update Note',
                'Create Contract', 'Remove Contract', 'Show Contract', 'Update Contract',
                'Create Semester', 'Remove Semester', 'Show Semester', 'Update Semester',
                'Create Timestable', 'Remove Timestable', 'Show Timestable', 'Update Timestable',
                'Create Room', 'Remove Room', 'Show Room', 'Update Room',
                'Create Level', 'Remove Level', 'Show Level', 'Update Level',
                'Create Level Class', 'Remove Level Class', 'Show Level Class', 'Update Level Class',
            ],
            'Admin' => [
                'Create Professor', 'Show Professor', 'Update Professor',
                'Create Student', 'Remove Student', 'Show Student', 'Update Student',
                'Create Parent', 'Remove Parent', 'Show Parent', 'Update Parent',
                'Create Personel', 'Remove Personel', 'Show Personel', 'Update Personel',
                'Create Others', 'Remove Others', 'Show Others', 'Update Others',
                'Create Course', 'Remove Course', 'Show Course', 'Update Course',
                'Create Note', 'Show Note', 'Update Note',
                'Create Contract', 'Show Contract',
                'Create Semester', 'Show Semester', 'Update Semester',
                'Create Timestable', 'Remove Timestable', 'Show Timestable', 'Update Timestable',
            ],
            'Student' => [
                'Show Timestable',
                'Show Course',
                'Show School Year',
                'Show Professor',
                'Show Room',
                'Show Note',
                'Show Level Class',
                'Show Subscribtion',
                'Create Subscribtion'
            ], 'Parent' => [
                'Show School',
                'Show Student',
                'Show Timestable',
                'Show Note',
                'Show Course',
                'Show School Year',
                'Show Professor',
                'Show Room',
                'Show Level Class',
                'Show Subscribtion',
                'Create Subscribtion'
            ], 'Professor' => [
                'Show Student',
                'Show Timestable',
                'Show Note',
                'Create Note',
                'Show Course',
                'Show School Year',
                'Show Professor',
                'Show Level Class'
            ], 'Personal' => [], 'Others' => []
        ];

        foreach ($roles as $key => $value) {
            $r = new Role();
            $r->name = $key;
            $r->guard_name = 'api';
            $r->save();
            foreach ($value as $p) {
                $permission = Permission::whereName($p)->first();

                if (!$permission) {
                    $permission = new Permission();
                    $permission->name = $p;
                    $permission->guard_name = 'api';
                    $permission->save();
                    $permission->assignRole($r);
                }
            }
        }
    }
}
