    <div class="row">
        <div class="col-md-5">
            <div class="card">
                <div class="card-body">
                    @include('_admin._layout.components.form-header', ['type' => "Edit"])
                    
                    <div>
                        @if ($errors->any())
                            <div class="alert alert-danger">
                                <b>Terjadi kesalahan pada proses input data</b> <br>
                                <ul class="mb-0">
                                    @foreach ($errors->all() as $error)
                                        <li>{{ $error }}</li>
                                    @endforeach
                                </ul>
                            </div>
                        @endif

                        <form method="POST" action="{{ base_url($page['route'] . '/update/' . $data->id) }}" navigate-form>
                            @csrf
                            <div class="mb-3">
                                <label for="name" class="form-label">Nama</label>
                                <input type="text" class="form-control" name="name" id="name"
                                    value="{{ $data->name }}">
                            </div>
                            <div class="mb-3">
                                <label for="email" class="form-label">Email</label>
                                <input type="email" class="form-control" name="email" id="email"
                                    value="{{ $data->email }}">
                            </div>
                            <div class="mb-3">
                                <label for="access_type" class="form-label">Hak Akses</label>
                                <select name="access_type" id="access_type" class="form-select" name="access_type">
                                    <option value="">- Pilih Hak Akses -</option>
                                    <option value="1" @selected($data->access_type == "1")>Admin (Semua Akses)</option>
                                    <option value="2" @selected($data->access_type == "2")>Pegawai</option>
                                </select>
                            </div>
                            <button type="submit" class="btn btn-primary bg-gradient"><b>Simpan Perubahan</b></button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
